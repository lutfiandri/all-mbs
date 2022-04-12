import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

import { useDispatch } from 'react-redux';
import { setActiveUser } from '../../redux/slices/user';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';
import { getUserByUid } from '../../utils/users';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const toast = useToast();
  const router = useRouter();

  const signInHandler = async () => {
    setLoading(true);
    const auth = getAuth();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = await userCredential.user;
      const activeUser = {
        email: user.email,
        uid: user.uid,
        name: user.displayName,
        role: user.email.includes('admin') ? 'admin' : 'krani',
      };
      dispatch(setActiveUser(activeUser));
      if (activeUser.role === 'admin') {
        router.replace('/admin');
      } else if (activeUser.role === 'krani') {
        router.replace('/');
      }
    } catch (error) {
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast({
        title: 'Gagal Sign In',
        description: 'Pastikan Email dan Password benar',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container h="100vh">
      <VStack h="100%" justifyContent="center">
        <Box w={40} h={40} bg="blue.100" p={4} borderRadius={16} mb={8}>
          <Image
            src="/vercel.svg"
            alt="logo"
            layout="responsive"
            width={400}
            height={400}
            color="black"
            priority
          />
        </Box>
        <Heading as="h1" fontSize="2xl" mb={4}>
          Sign In
        </Heading>
        <FormControl isRequired mb={4}>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </FormControl>
        <InputGroup size="md">
          <Input
            pr="3rem"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPass ? 'text' : 'password'}
            placeholder="Password"
          />
          <InputRightElement>
            <Center
              h="1.75rem"
              size="sm"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <Icon as={HiOutlineEyeOff} />
              ) : (
                <Icon as={HiOutlineEye} />
              )}
            </Center>
          </InputRightElement>
        </InputGroup>
        <Button
          colorScheme="blue"
          w="100%"
          onClick={signInHandler}
          isDisabled={loading}
        >
          Sign In
        </Button>
      </VStack>
    </Container>
  );
}
