import { Box, Center, HStack, VStack, Text } from '@chakra-ui/react';

export function HistoryItem({ harvester = '-', fruitsCount = 0 }) {
  return (
    <HStack bg="cyan.100" w="100%" spacing={0}>
      <Box flex={1} p={3} bg="blue.200">
        {harvester}
      </Box>
      <Box p={3} bg="blue.100" w={110}>
        <Text align="right">{fruitsCount} buah</Text>
      </Box>
    </HStack>
  );
}
