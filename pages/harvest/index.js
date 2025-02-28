import { Container, Box, Button, VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppBar2 } from '../../components/AppBar';
import { CustomNumberInput, CustomTextInput } from '../../components/Input';
import useActiveUser from '../../hooks/useActiveUser';
import { useSelector } from 'react-redux';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { addHarvest } from '../../utils/harvest/addHarvest';
import Head from 'next/head';

export default function Harvest() {
  useActiveUser();

  const krani = useSelector((state) => state.user);

  const router = useRouter();
  const toast = useToast();

  const [nama, setNama] = useState(router.query?.name);
  const [absen, setAbsen] = useState(router.query?.no);
  const [divisi, setDivisi] = useState('');
  const [matang, setMatang] = useState(0);
  const [mengkal, setMengkal] = useState(0);
  const [mentah, setMentah] = useState(0);
  const [lewat_matang, setLewat_matang] = useState(0);
  const [busuk, setBusuk] = useState(0);
  const [tangkai, setTangkai] = useState(0);
  const [brondolan, setBrondolan] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (nama === '' || absen === '' || divisi === '') {
      toast({
        title: 'Gagal',
        description: 'Nama, No. Absen, dan Divisi harus diisi.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    const data = {
      nama,
      absen,
      divisi,
      matang: Number(matang),
      mengkal: Number(mengkal),
      mentah: Number(mentah),
      lewat_matang: Number(lewat_matang),
      busuk: Number(busuk),
      tangkai: Number(tangkai),
      brondolan: Number(brondolan),
      krani_uid: krani.uid,
      nama_krani: krani.name,
    };

    setLoading(true);
    try {
      await addHarvest(data);
      setTimeout(() => {
        setLoading(false);
        router.replace('/');
      }, 2000);
      toast({
        title: 'Input Berhasil',
        description: 'Data telah disimpan',
        status: 'success',
        duration: 2000,
        isClosable: false,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
      toast({
        title: 'Input Gagal',
        description: 'Coba kembali',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });

      setLoading(false);
    }
  };
  return (
    <>
      <Head>
        <title>Panen | All MBS</title>
      </Head>
      <VStack w="100%" h="100vh" spacing={0}>
        <AppBar2
          title="Harvest"
          onBack={() => {
            router.back();
          }}
        />

        <Box w="100%" flex={1} overflowY="auto">
          <Container py={6} flex={1}>
            <CustomTextInput
              name="nama"
              data={nama}
              setData={setNama}
              placeholder="Nama Pemanen"
            />
            <CustomTextInput
              name="absen"
              data={absen}
              setData={setAbsen}
              placeholder="No. Absen Pemanen"
            />
            <CustomTextInput
              name="divisi"
              data={divisi}
              setData={setDivisi}
              placeholder="Divisi"
            />
            <CustomNumberInput
              name="matang"
              data={matang}
              setData={setMatang}
              placeholder="Buah Matang"
            />
            <CustomNumberInput
              name="mengkal"
              data={mengkal}
              setData={setMengkal}
              placeholder="Buah Mengkal"
            />
            <CustomNumberInput
              name="mentah"
              data={mentah}
              setData={setMentah}
              placeholder="Buah Mentah"
            />
            <CustomNumberInput
              name="lewat_matang"
              data={lewat_matang}
              setData={setLewat_matang}
              placeholder="Buah Lewat Matang"
            />
            <CustomNumberInput
              name="busuk"
              data={busuk}
              setData={setBusuk}
              placeholder="Buah Busuk"
            />
            <CustomNumberInput
              name="tangkai"
              data={tangkai}
              setData={setTangkai}
              placeholder="Tangkai Panjang"
            />
            <CustomNumberInput
              name="brondolan"
              data={brondolan}
              setData={setBrondolan}
              placeholder="Kg Brondolan"
            />
            <Button
              colorScheme="blue"
              w="100%"
              onClick={submitHandler}
              isDisabled={loading}
            >
              Submit
            </Button>
          </Container>
        </Box>
      </VStack>
    </>
  );
}
