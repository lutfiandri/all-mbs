import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { HiOutlineTrash } from 'react-icons/hi';

export function KraniListTable({ kranis }) {
  return (
    <Table w={600} size="sm">
      <Thead>
        <Tr>
          <Th>Nama</Th>
          <Th>Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        {kranis.map((krani) => (
          <Tr key={krani.id}>
            <Td>{krani.name}</Td>
            <Td>{krani.email}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
