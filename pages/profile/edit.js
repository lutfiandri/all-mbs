import { Box, Button, Container, useToast, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppBar2 } from '../../components/AppBar';
import { CustomTextInput } from '../../components/Input';
import useActiveUser from '../../hooks/useActiveUser';
import { getAuth, updateProfile } from 'firebase/auth';

export default function EditProfile() {
  useActiveUser();
  const krani = useSelector((state) => state.user);

  const toast = useToast();

  const [nama, setNama] = useState(krani.name);
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    try {
      setLoading(true);

      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: nama,
      });

      setTimeout(() => {
        setLoading(false);
        router.replace('/profile');
      }, 2000);
      toast({
        title: 'Berhasil',
        description: 'Data telah disimpan',
        status: 'success',
        duration: 2000,
        isClosable: false,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Gagal',
        description: 'Coba kembali',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const router = useRouter();
  return (
    <VStack w="100%" h="100vh" spacing={0}>
      <AppBar2
        title="Edit Profile"
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
            placeholder="Nama Krani"
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
  );
}
