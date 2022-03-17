import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  Spacer,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { NavItem } from './NavItem';

import { HiQrcode, HiHome, HiUserAdd, HiLogout } from 'react-icons/hi';
import { useRouter } from 'next/router';

export function SideNavBar() {
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
        <NavItem text="Sign Out" icon={HiLogout} />
      </Flex>
    </Container>
  );
}
