import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { SideNavBar } from '../../components/admin/side/SideNavBar';
import QRCode from 'qrcode.react';
import { HiOutlineDownload, HiOutlineLightningBolt } from 'react-icons/hi';
import { toPng } from 'html-to-image';
import { useState } from 'react';

export default function AdminQr() {
  const [nama, setNama] = useState('');
  const [absen, setAbsen] = useState('');

  const downloadHandler = () => {
    const qrElement = document.getElementById('qrcode-generated');
    toPng(qrElement).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = `allmbs-${absen}-${nama}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <HStack w="100%" bg="red" spacing={0}>
      <SideNavBar />
      <Container maxW="full" bg="gray.50" minH="100vh" py={8} px={16}>
        <Stack>
          <Heading fontSize="4xl" mb={4}>
            Create QR Code
          </Heading>
          <HStack maxW={600}>
            <FormControl flex={1}>
              <FormLabel htmlFor="absen">No. Absen</FormLabel>
              <Input
                id="absen"
                placeholder="No. Absen Pemanen"
                value={absen}
                onChange={(e) => setAbsen(e.target.value)}
              />
            </FormControl>
            <FormControl flex={2}>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <Input
                id="name"
                placeholder="Nama Pemanen"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
            </FormControl>
          </HStack>

          {/* <Heading as="h2" fontSize="xl" pt={4}>
            Hasil
          </Heading> */}
          <Box>
            <HStack
              bg="white"
              border="1px"
              borderColor="gray.200"
              borderRadius={8}
              p={4}
              w={600}
              id="qrcode-generated"
            >
              <QRCode
                size={160}
                value={`allmbs://harvest?name=${nama}&no=${absen}`}
              />
              <Box pl={2} w="100%">
                <HStack w="100%">
                  <Text w={14} fontSize="lg">
                    Nama
                  </Text>
                  <Text fontSize="lg" flex={1}>
                    : {nama}
                  </Text>
                </HStack>
                <HStack w="100%">
                  <Text w={14} fontSize="lg">
                    No
                  </Text>
                  <Text fontSize="lg" flex={1}>
                    : {absen}
                  </Text>
                </HStack>
              </Box>
            </HStack>
          </Box>

          <Button
            colorScheme="blue"
            w="min-content"
            size="sm"
            leftIcon={<HiOutlineDownload />}
            onClick={downloadHandler}
          >
            Download PNG
          </Button>
        </Stack>
      </Container>
    </HStack>
  );
}
