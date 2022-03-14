import { Container, Box, Center } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';

export default function Profile() {
  return (
    <>
      <AppBar1 title="Profile" />
      <Container py={4}>
        <Center>Profile</Center>
      </Container>
      <BottomNavBar />
    </>
  );
}
