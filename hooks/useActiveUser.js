/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch } from 'react-redux';
import { setActiveUser, setUserInactive } from '../redux/slices/user';
import { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { getUserByUid } from '../utils/users';

export default function useActiveUser(role = 'krani') {
  const dispatch = useDispatch();
  const router = useRouter();

  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const activeUser = {
          email: user.email,
          uid: user.uid,
          name: user.displayName,
          role: user.email.includes('admin') ? 'admin' : 'krani',
        };
        // console.log(activeUser);
        if (activeUser.role !== role) {
          dispatch(setUserInactive());
          router.replace('/signin');
        }
        dispatch(setActiveUser(activeUser));
      } else {
        dispatch(setUserInactive());
        router.replace('/signin');
      }
    });
  }, []);
}
