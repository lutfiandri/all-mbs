import Head from 'next/head';
import Image from 'next/image';
import { Container } from '@chakra-ui/react';
import { AppBar1, AppBar2 } from '../components/AppBar';
import { BottomNavBar } from '../components/BottomNavBar';

export default function Home() {
  return (
    <>
      <AppBar1 title="Scan QR Code" />
      <Container></Container>
      <BottomNavBar activeRoute="/" />
    </>
  );
}
