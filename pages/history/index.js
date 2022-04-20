import { Container, Box, VStack, Button, Spacer, Flex } from '@chakra-ui/react';
import { AppBar1 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import useActiveUser from '../../hooks/useActiveUser';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HistoryTable } from '../../components/admin/HistoryTable';
import { HiOutlineDownload } from 'react-icons/hi';
import { CustomDatePicker } from '../../components/CustomDatePicker';
import { downloadCsv } from '../../utils/history/downloadCsv';

export default function History() {
  useActiveUser();

  const [harvests, setHarvests] = useState([]);
  const krani_uid = useSelector((state) => state.user.uid);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    startDate.setHours(0, 0, 0);
    const midnight = new Date(startDate);
    startDate.setHours(23, 59, 59);
    const nextMidnight = new Date(startDate);

    const q = query(
      collection(db, 'harvests'),
      where('krani_uid', '==', krani_uid),
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
          data.matang + data.mengkal + data.mentah + data.overripe + data.busuk;
        collectionData.push(data);
      });
      setHarvests(collectionData);
    });

    return unsubscribe;
  }, [startDate, krani_uid]);

  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="History" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4} h="full">
            <Flex alignItems="start" direction="column" h="full" gap={4}>
              <CustomDatePicker date={startDate} setStartDate={setStartDate} />
              <Box overflowX="auto" w="full" flex={1}>
                <HistoryTable data={harvests} withKrani={false} />
              </Box>
              {/* <Spacer /> */}
              {/* <Button
                // w="full"
                size="sm"
                colorScheme="blue"
                leftIcon={<HiOutlineDownload />}
                onClick={() => downloadCsv(harvests)}
              >
                Download CSV
              </Button> */}
            </Flex>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
