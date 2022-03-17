import { Container, Box, Center, VStack, Text } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import { HistoryItem } from '../../components/history/HistoryItem';
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

export default function History() {
  useActiveUser();

  const [harvests, setHarvests] = useState([]);
  const [dateString, setDateString] = useState('');
  const krani_uid = useSelector((state) => state.user.uid);

  useEffect(() => {
    const now = new Date();
    const date = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'full',
    }).format(now);
    setDateString(date);
  }, []);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const midnight = new Date(now);

    const q = query(
      collection(db, 'harvests'),
      where('krani_uid', '==', krani_uid),
      where('created_at', '>=', midnight),
      orderBy('created_at', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const collectionData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        collectionData.push({
          id: doc.id,
          nama: data.nama,
          jumlah: data.jumlah,
        });
      });
      setHarvests(collectionData);
    });

    return unsubscribe;
  }, [krani_uid]);

  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="History" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4}>
            <Box mb={2}>
              <Text fontWeight="bold">{dateString}</Text>
            </Box>
            <VStack>
              {harvests.map((harvest) => (
                <HistoryItem
                  key={harvest.id}
                  harvester={harvest.nama}
                  fruitsCount={harvest.jumlah}
                />
              ))}
            </VStack>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
