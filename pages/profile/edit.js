import { VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { AppBar2 } from '../../components/AppBar';
import useActiveUser from '../../hooks/useActiveUser';

export default function EditProfile() {
  useActiveUser();
  const router = useRouter();
  return (
    <VStack w="100%" h="100vh" spacing={0}>
      <AppBar2
        title="Edit Profile"
        onBack={() => {
          router.back();
        }}
      />
    </VStack>
  );
}
