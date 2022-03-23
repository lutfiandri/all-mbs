import { Container, Box, VStack, Text, useToast } from '@chakra-ui/react';
import { AppBar1 } from '../components/AppBar';
import { BottomNavBar } from '../components/BottomNavBar';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import parse from 'url-parse';
import { QRCodeReader } from '../components/qr/QRCodeReader';
import useActiveUser from '../hooks/useActiveUser';

export default function Home() {
  useActiveUser();
  const [data, setData] = useState('');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (data === '') return;
    const parsed = parse(data);

    console.log(parsed);

    if (parsed.protocol !== 'allmbs:' || parsed.hostname !== 'harvest') {
      console.log(parsed.protocol, parsed.hostname);
      setData('');
      toast({
        title: 'Gagal Scan',
        description: 'Format data QR Code tidak sesuai.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log(parsed);

    router.push(`/harvest${parsed.query}`);
  }, [data, router, toast]);

  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="Scan QR Code" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4}>
            <QRCodeReader setData={setData}></QRCodeReader>
            <Text color="gray.700" align="center" mx="auto">
              Scanning...
            </Text>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
