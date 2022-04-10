import { db, auth } from '../../../utils/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = [];
      const querySnapshot = await db.collection('users').get();
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return res.json({ status: 'success', data });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error,
      });
    }
  } else if (req.method === 'POST') {
    const { name, email, password } = req.body;
    try {
      console.log(1);
      const userRecord = await auth.createUser({
        email: email,
        // emailVerified: false,
        password: password,
        // displayName: name,
      });
      console.log(2);
      res.json({ status: 'success', userRecord });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        error,
      });
    }
  }

  return res.status(405);
}

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
