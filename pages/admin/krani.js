import { Container, Heading, HStack } from '@chakra-ui/react';
import { SideNavBar } from '../../components/admin/side/SideNavBar';

export default function AdminKrani() {
  return (
    <HStack w="100%" bg="red" spacing={0}>
      <SideNavBar />
      <Container maxW="full" bg="gray.50" minH="100vh" py={8} px={16}>
        <Heading></Heading>
      </Container>
    </HStack>
  );
}
