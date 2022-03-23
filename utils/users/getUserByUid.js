import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getUserByUid = async (uid) => {
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch (error) {}
};
