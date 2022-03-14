import { Container, Box, Center, VStack, Text, Spacer } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../components/AppBar';
import { BottomNavBar } from '../components/BottomNavBar';
import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import { useRouter } from 'next/router';
import parse from 'url-parse';

function MyQR({ setData }) {
  // https://goqr.me/#
  return (
    <Box mx={4} my={4} borderRadius={24} overflow="hidden">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        scanDelay={500}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '100%' }}
        videoContainerStyle={{
          width: '100%',
          margin: '0 auto',
          transform: 'rotateY(180deg)',
        }}
        videoStyle={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

export default function Home() {
  const [data, setData] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (data === '') return;
    const parsed = parse(data);
    console.log(data);
    console.log(parsed);

    router.push(`/harvest${parsed.query}`);
  }, [data, router]);

  return (
    <>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar1 title="Scan QR Code" />
        <Box w="100%" flex={1} overflowY="auto">
          <Container py={4} mt={12}>
            <MyQR setData={setData}></MyQR>
            <Text color="gray.700" align="center" mx="auto">
              {data ? 'forwarding...' : 'scanning...'}
            </Text>
          </Container>
        </Box>
        <BottomNavBar />
      </VStack>
    </>
  );
}
