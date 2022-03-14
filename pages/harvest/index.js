import { Container, Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AppBar2 } from '../../components/AppBar';
import { CustomNumberInput, CustomTextInput } from '../../components/Input';

export default function Harvest() {
  const router = useRouter();
  const toast = useToast();

  const [nama, setNama] = useState(router.query?.name);
  const [absen, setAbsen] = useState(router.query?.no);
  const [divisi, setDivisi] = useState('');
  const [matang, setMatang] = useState(0);
  const [mengkal, setMengkal] = useState(0);
  const [mentah, setMentah] = useState(0);
  const [abnormal, setAbnormal] = useState(0);
  const [busuk, setBusuk] = useState(0);
  const [jumlah, setJumlah] = useState(0);
  const [brondolan, setBrondolan] = useState(0);

  const submitHandler = () => {
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
      matang,
      mentah,
      mengkal,
      mentah,
      abnormal,
      busuk,
      jumlah,
      brondolan,
    };
    console.log(data);
  };

  return (
    <>
      <AppBar2
        title="Harvest"
        onBack={() => {
          router.back();
        }}
      />
      <Container py={6}>
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
          name="abnormal"
          data={abnormal}
          setData={setAbnormal}
          placeholder="Buah Abnormal"
        />
        <CustomNumberInput
          name="busuk"
          data={busuk}
          setData={setBusuk}
          placeholder="Buah Busuk"
        />
        <CustomNumberInput
          name="jumlah"
          data={jumlah}
          setData={setJumlah}
          placeholder="Jumlah Buah"
        />
        <CustomNumberInput
          name="brondolan"
          data={brondolan}
          setData={setBrondolan}
          placeholder="Kg Brondolan"
        />
        <Button colorScheme="blue" w="100%" onClick={submitHandler}>
          Submit
        </Button>
      </Container>
    </>
  );
}
