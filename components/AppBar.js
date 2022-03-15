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
    <Box borderBottom="1px" borderColor="gray.200" py={4} w="100%">
      <Container>
        <Center>
          <Heading as="h1" size="md" isTruncated fontWeight="medium">
            {title}
          </Heading>
        </Center>
      </Container>
    </Box>
  );
}

export function AppBar2({ title, onBack }) {
  return (
    <Box borderBottom="1px" borderColor="gray.200" py={4} w="100%">
      <Container>
        <HStack>
          <Icon as={HiArrowLeft} onClick={onBack} />
          <Heading as="h1" size="md" isTruncated fontWeight="medium">
            {title}
          </Heading>
        </HStack>
      </Container>
    </Box>
  );
}
