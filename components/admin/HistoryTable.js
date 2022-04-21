import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

export const HistoryTable = ({ data, withKrani = true }) => {
  return (
    <Table size="sm" colorScheme="blue">
      <Thead>
        <Tr>
          <Th isNumeric>No</Th>
          <Th>Nama Pemanen</Th>
          <Th isNumeric>No Absen</Th>
          <Th isNumeric>Divisi</Th>
          {withKrani && <Th>Nama Krani</Th>}
          <Th isNumeric>Matang</Th>
          <Th isNumeric>Mengkal</Th>
          <Th isNumeric>Mentah</Th>
          <Th isNumeric>Lewat Matang</Th>
          <Th isNumeric>Busuk</Th>
          <Th isNumeric>Tangkai Panjang</Th>
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
              {withKrani && <Td>{row.nama_krani}</Td>}
              <Td isNumeric>{row.matang}</Td>
              <Td isNumeric>{row.mengkal}</Td>
              <Td isNumeric>{row.mentah}</Td>
              <Td isNumeric>{row.lewat_matang}</Td>
              <Td isNumeric>{row.busuk}</Td>
              <Td isNumeric>{row.tangkai}</Td>
              <Td isNumeric>{row.jumlah}</Td>
              <Td isNumeric>{row.brondolan.toFixed(2)}</Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
