/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { setActiveUser, setUserInactive } from '../redux/slices/user';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function useActiveUser() {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const activeUser = {
          email: user.email,
          uid: user.uid,
        };
        dispatch(setActiveUser(activeUser));
      } else {
        dispatch(setUserInactive());
        router.replace('/signin');
      }
    });
  }, []);
}
