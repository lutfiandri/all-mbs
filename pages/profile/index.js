import {
  Container,
  Box,
  VStack,
  Text,
  Heading,
  HStack,
  Button,
  Spacer,
  Flex,
  toast,
  useToast,
} from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../../components/AppBar';
import { BottomNavBar } from '../../components/BottomNavBar';
import useActiveUser from '../../hooks/useActiveUser';

import { getAuth, signOut } from 'firebase/auth';
import { setUserInactive } from '../../redux/slices/user';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useRouter } from 'next/router';

function TitleDesc({ title, desc }) {
  return (
    <Box mb={4}>
      <Heading
        as="h2"
        fontWeight="normal"
        fontSize="md"
        color="gray.600"
        mb={1}
      >
        {title}
      </Heading>
      <Text>{desc}</Text>
    </Box>
  );
}

export default function Profile() {
  useActiveUser();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const signOutHandler = () => {
    setLoading(true);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(setUserInactive());
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast({
          title: 'Gagal Sign Out.',
          description: 'Coba ulangi sign out beberapa saat lagi.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="Profile" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4} h="100%">
            <Flex flexDirection="column" h="100%">
              <TitleDesc title="Nama Krani" desc="Lutfi Krani" />
              <TitleDesc title="Nama Krani" desc="Lutfi Krani" />
              <Spacer />
              <HStack w="100%">
                <Button
                  flex={1}
                  colorScheme="green"
                  onClick={() => router.push('/profile/edit')}
                >
                  Edit Profile
                </Button>
                <Button
                  flex={1}
                  colorScheme="red"
                  onClick={signOutHandler}
                  isDisabled={loading}
                >
                  Sign Out
                </Button>
              </HStack>
            </Flex>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
