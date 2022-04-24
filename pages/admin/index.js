import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Heading,
  HStack,
  Select,
  Stack,
} from '@chakra-ui/react';
import { SideNavBar } from '../../components/admin/side/SideNavBar';
import { HiOutlineDownload } from 'react-icons/hi';
import { HistoryTable } from '../../components/admin/HistoryTable';

import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { CustomDatePicker } from '../../components/CustomDatePicker';
import useActiveUser from '../../hooks/useActiveUser';
import Head from 'next/head';
import { downloadCsv } from '../../utils/history/downloadCsv';
import axios from 'axios';

export default function AdminHome() {
  useActiveUser('admin');

  const [region, setRegion] = useState('id-ID');

  const [harvests, setHarvests] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    startDate.setHours(0, 0, 0);
    const midnight = new Date(startDate);
    startDate.setHours(23, 59, 59);
    const nextMidnight = new Date(startDate);

    const q = query(
      collection(db, 'harvests'),
      where('created_at', '>=', midnight),
      where('created_at', '<=', nextMidnight),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const collectionData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        data.jumlah =
          data.matang +
          data.mengkal +
          data.mentah +
          data.lewat_matang +
          data.busuk;
        collectionData.push(data);
      });
      setHarvests(collectionData);
    });

    return unsubscribe;
  }, [startDate]);

  const downloadCsvMonthHandler = async () => {
    try {
      const result = await axios({
        method: 'GET',
        url: '/api/harvests/month',
      });
      if (result.status !== 200) throw result;

      const harvests = result.data.data;
      downloadCsv(harvests, region);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard | All MBS</title>
      </Head>
      <HStack maxW="100%" bg="gray.50" spacing={0} color="gray.800">
        <SideNavBar />
        <Container
          maxW="100%"
          bg="gray.50"
          minH="100vh"
          py={8}
          px={16}
          overflowX="auto"
        >
          <Stack w="100%">
            <Heading fontSize="4xl" mb={4}>
              Dashboard
            </Heading>
            <HStack>
              <CustomDatePicker date={startDate} setStartDate={setStartDate} />
              <Center height="50px">
                <Divider orientation="vertical" colorScheme="blue" />
              </Center>
              <Select
                // placeholder="CSV Format"
                w="fit-content"
                bg="white"
                borderColor="gray.300"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="id-ID">id-ID</option>
                <option value="en-US">en-US</option>
              </Select>
              <Button
                colorScheme="blue"
                leftIcon={<HiOutlineDownload />}
                onClick={() => downloadCsv(harvests, region)}
              >
                Download CSV
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<HiOutlineDownload />}
                onClick={downloadCsvMonthHandler}
              >
                Download CSV (Month)
              </Button>
            </HStack>
            <HistoryTable data={harvests} />
          </Stack>
        </Container>
      </HStack>
    </>
  );
}
