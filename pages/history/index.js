import { Container, Box, Center, VStack, Text } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import { HistoryItem } from '../../components/history/HistoryItem';
import useActiveUser from '../../hooks/useActiveUser';

export default function History() {
  useActiveUser();
  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="History" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4}>
            <Box mb={2}>
              <Text fontWeight="bold">Senin, 24 Maret 2022</Text>
            </Box>
            <VStack>
              <HistoryItem harvester="Lutfi Andriyanto" fruitsCount={100} />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
              <HistoryItem />
            </VStack>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
