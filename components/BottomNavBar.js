import { Box, Center, HStack, Icon, Text } from '@chakra-ui/react';
import {
  HiOutlineQrcode,
  HiOutlineDocumentText,
  HiOutlineUser,
} from 'react-icons/hi';

export function BottomNavBar({ activeRoute }) {
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

  const Items = routes.map((route) => (
    <Center
      key={route.route}
      flexDirection="column"
      flex={1}
      py={2}
      // bg="cyan.400"
      textColor={activeRoute === route.route ? 'blue.900' : 'gray.500'}
    >
      <Icon as={route.icon} boxSize={5} />
      <Text fontSize="sm">{route.text}</Text>
    </Center>
  ));

  return (
    <Box pos="fixed" bottom={0} w="100%">
      <HStack spacing="-1px">{Items}</HStack>
    </Box>
  );
}
