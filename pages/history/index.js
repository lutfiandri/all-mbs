import { Container, Box, Center, VStack, Text } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import { HistoryItem } from '../../components/history/HistoryItem';

export default function History() {
  return (
    <>
      <VStack w="100%" h="100vh">
        <AppBar1 title="History" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container pt={4} pb={20}>
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
            </VStack>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
