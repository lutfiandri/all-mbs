import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  HStack,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { SideNavBar } from '../../components/admin/side/SideNavBar';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from '@chakra-ui/react';
import { HiOutlineDownload } from 'react-icons/hi';

export default function AdminHome() {
  return (
    <HStack w="100%" bg="red" spacing={0} color="gray.800">
      <SideNavBar />
      <Container maxW="full" bg="gray.50" minH="100vh" py={8} px={16}>
        <Stack w="100%">
          <Heading fontSize="4xl" mb={4}>
            Dashboard
          </Heading>
          <HStack>
            <Box py={2} px={4} bg="gray.400" w="fit-content">
              Kamis, 17 Maret 2002 ⬇️
            </Box>
            <Button
              colorScheme="blue"
              size="sm"
              leftIcon={<HiOutlineDownload />}
            >
              Download CSV
            </Button>
          </HStack>
          <Box maxW="100%" overflowX="auto">
            <Table size="sm" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th isNumeric>No</Th>
                  {/* <Th>Nama Krani</Th> */}
                  <Th>Nama Pemanen</Th>
                  <Th isNumeric>No Absen</Th>
                  <Th>Divisi</Th>
                  <Th isNumeric>Matang</Th>
                  <Th isNumeric>Mengkal</Th>
                  <Th isNumeric>Mentah</Th>
                  <Th isNumeric>Abnormal</Th>
                  <Th isNumeric>Busuk</Th>
                  <Th isNumeric>Jumlah</Th>
                  <Th isNumeric>Brondolan (Kg)</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td isNumeric>1</Td>
                  {/* <Td>Lutfi Andriyanto</Td> */}
                  <Td>Ama Himalatus</Td>
                  <Td isNumeric>1</Td>
                  <Td>Selatan</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>1233</Td>
                  <Td isNumeric>1233.32</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>1</Td>
                  {/* <Td>Lutfi Andriyanto</Td> */}
                  <Td>Ama Himalatus</Td>
                  <Td isNumeric>1</Td>
                  <Td>Selatan</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>1233</Td>
                  <Td isNumeric>1233.32</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>1</Td>
                  {/* <Td>Lutfi Andriyanto</Td> */}
                  <Td>Ama Himalatus</Td>
                  <Td isNumeric>1</Td>
                  <Td>Selatan</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>1233</Td>
                  <Td isNumeric>1233.32</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>1</Td>
                  {/* <Td>Lutfi Andriyanto</Td> */}
                  <Td>Ama Himalatus</Td>
                  <Td isNumeric>1</Td>
                  <Td>Selatan</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>1233</Td>
                  <Td isNumeric>1233.32</Td>
                </Tr>
                <Tr>
                  <Td isNumeric>1</Td>
                  {/* <Td>Lutfi Andriyanto</Td> */}
                  <Td>Ama Himalatus</Td>
                  <Td isNumeric>1</Td>
                  <Td>Selatan</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>123</Td>
                  <Td isNumeric>1233</Td>
                  <Td isNumeric>1233.32</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Stack>
      </Container>
    </HStack>
  );
}
