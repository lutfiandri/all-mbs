import {
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  VStack,
  useToast,
  InputRightAddon,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SideNavBar } from '../../components/admin/side/SideNavBar';
import { createKrani } from '../../utils/krani';
import { generate } from 'generate-password';
import { KraniListTable } from '../../components/admin/KraniListTable';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../utils/firebase';

export default function AdminKrani() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [nav, setNavigator] = useState(null);
  const [kranis, setKranis] = useState([]);

  const toast = useToast();

  useEffect(() => {
    console.log(navigator);
    setNavigator(navigator);
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'krani'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const kraniTemps = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        data.id = doc.id;
        kraniTemps.push(data);
      });
      console.log(kraniTemps);
      setKranis(kraniTemps);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('kranis', kranis);
  }, [kranis]);

  const emailRegexValidator = (username) => {
    const validRegex = /^[a-zA-Z0-9.#*+_~-]/;
    if (username.match(validRegex)) {
      return true;
    }
    return false;
  };

  const emailFirstLastCharValidator = (username) => {
    const symbols = '.#*+_~-';
    if (symbols.includes(username.at(0)) || symbols.includes(username.at(-1))) {
      return false;
    }
    return true;
  };

  const createKraniHandler = async () => {
    setLoading(true);
    try {
      if (email === '' || password === '')
        throw new Error('validation/empty-email-password');

      const user = await createKrani(email + '@allmbs.id', password, name);
      toast({
        title: 'Berhasil',
        description: 'Akun krani berhasil dibuat',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    } catch (error) {
      let desc = 'Terjadi kesalahan.';
      if (error.message === 'validation/empty-email-password') {
        desc = 'Mohon isi email dan password.';
      } else if (error.code === 'auth/email-already-in-use') {
        desc = 'Email telah terdaftar. Gunakan email lainnya.';
      }
      toast({
        title: 'Gagal',
        description: desc,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      });
    } finally {
      setLoading(false);
    }
  };

  const generatePasswordHandler = async () => {
    const pass = generate({
      length: 8,
      numbers: true,
    });
    setPassword(pass);
    await nav.clipboard.writeText(password);
    toast({
      title: 'Password Disalin',
      // description: desc,
      status: 'info',
      duration: 3000,
      isClosable: true,
      position: 'bottom-right',
    });
  };

  return (
    <HStack w="100%" bg="red" spacing={0}>
      <SideNavBar />
      <Container
        maxW="full"
        bg="gray.50"
        minH="100vh"
        py={8}
        px={16}
        overflowX="auto"
      >
        <Stack>
          <Heading fontSize="4xl" mb={4}>
            Create Krani Account
          </Heading>
          <VStack maxW={600}>
            <FormControl flex={1}>
              <FormLabel htmlFor="name">Nama</FormLabel>
              <Input
                id="name"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl flex={1}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <Input
                  id="email"
                  placeholder="Username Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputRightAddon>@allmbs.id</InputRightAddon>
              </InputGroup>
            </FormControl>
            <FormControl flex={1}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr={28}
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement w={28}>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={generatePasswordHandler}
                  >
                    Generate
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </VStack>
          <Button
            colorScheme="blue"
            onClick={createKraniHandler}
            w="fit-content"
            isDisabled={loading}
          >
            Create Krani
          </Button>

          {/* table */}
          <Heading as="h2" fontSize="xl" pt={4}>
            Daftar Akun Krani
          </Heading>
          <KraniListTable kranis={kranis} />
        </Stack>
      </Container>
    </HStack>
  );
}
