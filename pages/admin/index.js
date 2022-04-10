import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
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
import { convertArrayToCSV } from 'convert-array-to-csv';
import { CustomDatePicker } from '../../components/CustomDatePicker';
import useActiveUser from '../../hooks/useActiveUser';

export default function AdminHome() {
  useActiveUser('admin');

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
          data.matang + data.mengkal + data.mentah + data.abnormal + data.busuk;
        collectionData.push(data);
      });
      setHarvests(collectionData);
    });

    return unsubscribe;
  }, [startDate]);

  const downloadCsvHandler = () => {
    const now = new Date();
    const date = new Intl.DateTimeFormat('id-ID').format(now);
    const data = harvests.map((harvest, index) => {
      return {
        no: index + 1,
        nama: harvest.nama,
        absen: harvest.absen,
        tanggal: date,
        matang: harvest.matang,
        mengkal: harvest.mengkal,
        mentah: harvest.mentah,
        abnormal: harvest.abnormal,
        busuk: harvest.busuk,
        jumlah: harvest.jumlah,
        brondolan: harvest.brondolan,
      };
    });
    const csvData = 'data:text/csv;charset=utf-8,' + convertArrayToCSV(data);

    const encodedUri = encodeURI(csvData);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'allmbs-' + date);
    document.body.appendChild(link);
    link.click();
  };

  return (
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
            <Button
              colorScheme="blue"
              leftIcon={<HiOutlineDownload />}
              onClick={downloadCsvHandler}
            >
              Download CSV
            </Button>
          </HStack>
          <HistoryTable data={harvests} />
        </Stack>
      </Container>
    </HStack>
  );
}
