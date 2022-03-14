import { Container, Box, Center, VStack } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import useActiveUser from '../../hooks/useActiveUser';

export default function Profile() {
  useActiveUser();
  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="Profile" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4}>
            <Center>Profile</Center>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
