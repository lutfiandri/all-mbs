import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { NavItem } from './NavItem';
import { HiQrcode, HiHome, HiUserAdd, HiLogout } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { getAuth, signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserInactive } from '../../../redux/slices/user';
import { useState } from 'react';

export function SideNavBar() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  const routes = [
    {
      text: 'Dashboard',
      icon: HiHome,
      route: '/admin',
    },
    {
      text: 'Create QR',
      icon: HiQrcode,
      route: '/admin/qr',
    },
    {
      text: 'Create Krani',
      icon: HiUserAdd,
      route: '/admin/krani',
    },
  ];

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
    <Container
      bg="white"
      w={64}
      h="100vh"
      py={4}
      px={8}
      shadow="lg"
      pos="sticky"
      left={0}
      top={0}
      bottom={0}
      zIndex={1000}
    >
      <Flex flexDirection="column" h="100%">
        <Box w="100%" py={4} pb={6}>
          <HStack w="100%">
            <Box w={8} h={8} bg="blue" borderRadius={4} p={2}>
              <Image
                src="/vercel.svg"
                alt="logo"
                width={40}
                height={40}
                layout="responsive"
              />
            </Box>
            <Text fontSize="lg" fontWeight="bold">
              All MBS
            </Text>
          </HStack>
        </Box>

        <Box w="100%" h={4}>
          <Divider />
        </Box>

        {routes.map((route) => {
          return (
            <NavItem
              key={route.route}
              text={route.text}
              icon={route.icon}
              route={route.route}
              onClick={() => router.push(route.route)}
            />
          );
        })}

        <Spacer flex={1} />
        <NavItem text="Sign Out" icon={HiLogout} onClick={signOutHandler} />
      </Flex>
    </Container>
  );
}
