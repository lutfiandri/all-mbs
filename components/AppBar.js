import {
  Container,
  HStack,
  Box,
  Heading,
  Center,
  Icon,
} from '@chakra-ui/react';
import { HiArrowLeft } from 'react-icons/hi';

export function AppBar1({ title }) {
  return (
    <Box
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      zIndex={1000}
      py={4}
      pos="sticky"
      top={0}
    >
      <Container>
        <Center>
          <Heading as="h1" size="md" isTruncated>
            {title}
          </Heading>
        </Center>
      </Container>
    </Box>
  );
}

export function AppBar2({ title, onBack }) {
  return (
    <Box
      borderBottom="1px"
      borderColor="gray.200"
      bg="white"
      zIndex={1000}
      py={4}
      pos="sticky"
      top={0}
    >
      <Container>
        <HStack>
          <Icon as={HiArrowLeft} onClick={onBack} />
          <Heading as="h1" size="md" isTruncated>
            {title}
          </Heading>
        </HStack>
      </Container>
    </Box>
  );
}
