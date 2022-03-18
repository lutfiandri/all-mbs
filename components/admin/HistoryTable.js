import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export const HistoryTable = ({ data }) => {
  return (
    <Table size="sm" colorScheme="blue">
      <Thead>
        <Tr>
          <Th isNumeric>No</Th>
          <Th>Nama Pemanen</Th>
          <Th isNumeric>No Absen</Th>
          <Th isNumeric>Divisi</Th>
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
        {data.map((row, index) => {
          return (
            <Tr key={row.id}>
              <Td isNumeric>{index + 1}</Td>
              <Td>{row.nama}</Td>
              <Td isNumeric>{row.absen}</Td>
              <Td isNumeric>{row.divisi}</Td>
              <Td isNumeric>{row.matang}</Td>
              <Td isNumeric>{row.mengkal}</Td>
              <Td isNumeric>{row.mentah}</Td>
              <Td isNumeric>{row.abnormal}</Td>
              <Td isNumeric>{row.busuk}</Td>
              <Td isNumeric>{row.jumlah}</Td>
              <Td isNumeric>{row.brondolan}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
