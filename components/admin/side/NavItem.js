import { Box, HStack, Icon, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function NavItem({ text, icon, route, onClick }) {
  const [active, setActive] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (route === router.pathname) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [route, router.pathname]);

  return (
    <Box
      w="100%"
      py={2}
      cursor="pointer"
      color={active ? 'blue.500' : 'gray.500'}
      transition="all 150ms"
      _hover={{
        color: 'blue.400',
      }}
      onClick={onClick}
    >
      <HStack>
        <Icon as={icon} w={5} h={5} />
        <Text w="max-content"> {text}</Text>
      </HStack>
    </Box>
  );
}
