import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { HiOutlineTrash } from 'react-icons/hi';

export function KraniListTable({ kranis, setKranis }) {
  const toast = useToast();

  const deleteKraniHandler = (uid) => {
    try {
      axios({
        method: 'DELETE',
        url: '/api/kranis/' + uid,
      });
      const newKranis = kranis.filter((krani) => krani.uid !== uid);
      setKranis(newKranis);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Gagal',
        description: 'Gagal menghapus akun krani',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    }
  };

  return (
    <Table w={600} size="sm">
      <Thead>
        <Tr>
          <Th>Nama</Th>
          <Th>Email</Th>
          <Th isNumeric>Aksi</Th>
        </Tr>
      </Thead>
      <Tbody>
        {kranis.map((krani) => (
          <Tr key={krani.id}>
            <Td>{krani.name}</Td>
            <Td>{krani.email}</Td>
            <Td isNumeric>
              <Button
                leftIcon={<HiOutlineTrash />}
                size="xs"
                colorScheme="red"
                onClick={() => deleteKraniHandler(krani.uid)}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
