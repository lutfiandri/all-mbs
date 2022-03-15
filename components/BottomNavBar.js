import { Box, Center, HStack, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import {
  HiOutlineQrcode,
  HiOutlineDocumentText,
  HiOutlineUser,
} from 'react-icons/hi';
import { useMediaQuery } from '@chakra-ui/react';

export function BottomNavBar() {
  const [isMobile] = useMediaQuery('(max-width: 800px)');

  const router = useRouter();

  const routes = [
    {
      text: 'History',
      icon: HiOutlineDocumentText,
      route: '/history',
    },
    {
      text: 'Scan',
      icon: HiOutlineQrcode,
      route: '/',
    },
    {
      text: 'Profile',
      icon: HiOutlineUser,
      route: '/profile',
    },
  ];

  const clickHandler = (routeText) => {
    if (routeText === router.pathname) return;
    router.replace(routeText);
  };

  const Items = routes.map((route) => (
    <Center
      key={route.route}
      flexDirection="column"
      flex={1}
      py={2}
      textColor={router.pathname === route.route ? 'blue.900' : 'gray.500'}
      onClick={() => clickHandler(route.route)}
      cursor="pointer"
      transition={isMobile ? '' : 'background 150ms'}
      _hover={{
        bg: isMobile ? '' : 'blue.100',
      }}
    >
      <Icon as={route.icon} boxSize={5} />
      <Text fontSize="sm">{route.text}</Text>
    </Center>
  ));

  return (
    <Box w="100%" bg="gray.100">
      <HStack spacing="-1px">{Items}</HStack>
    </Box>
  );
}
