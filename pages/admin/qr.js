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
import { HiOutlineDownload } from 'react-icons/hi';
import { toPng } from 'html-to-image';
import { useState } from 'react';
import useActiveUser from '../../hooks/useActiveUser';
import Head from 'next/head';

export default function AdminQr() {
  useActiveUser('admin');

  const [nama, setNama] = useState('');
  const [absen, setAbsen] = useState('');

  const downloadCardHandler = () => {
    const qrElement = document.getElementById('qrcode-generated');
    toPng(qrElement).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = `allmbs-${absen}-${nama}-card.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const downloadQRHandler = () => {
    const qrElement = document.querySelector('#qrcode-generated canvas');
    toPng(qrElement).then(function (dataUrl) {
      const link = document.createElement('a');
      link.download = `allmbs-${absen}-${nama}-qr.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <>
      <Head>
        <title>QR | All MBS</title>
      </Head>
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
                    <Text w={1}>:</Text>
                    <Text fontSize="lg" flex={1}>
                      {nama}
                    </Text>
                  </HStack>
                  <HStack w="100%">
                    <Text w={14} fontSize="lg">
                      No
                    </Text>
                    <Text w={1}>:</Text>
                    <Text fontSize="lg" flex={1}>
                      {absen}
                    </Text>
                  </HStack>
                </Box>
              </HStack>
            </Box>

            <HStack>
              <Button
                colorScheme="blue"
                w="min-content"
                size="sm"
                leftIcon={<HiOutlineDownload />}
                onClick={downloadCardHandler}
              >
                Download Card
              </Button>
              <Button
                colorScheme="blue"
                w="min-content"
                size="sm"
                leftIcon={<HiOutlineDownload />}
                onClick={downloadQRHandler}
              >
                Download QR
              </Button>
            </HStack>
          </Stack>
        </Container>
      </HStack>
    </>
  );
}
