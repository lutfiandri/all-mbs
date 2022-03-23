import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const addToFirestore = async (uid, email, name) => {
  try {
    await setDoc(doc(db, 'users', uid), {
      email,
      name,
      role: 'krani',
    });
    return {
      status: 'success',
    };
  } catch (error) {
    console.log(error);
    throw new Error('krani/add-to-firestore');
  }
};

export const createKrani = async (email, password, name) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    addToFirestore(user.uid, email, name);
    return user;
  } catch (error) {
    throw error;
  }
};
