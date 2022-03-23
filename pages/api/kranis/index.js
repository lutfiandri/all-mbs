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
      return res.json({
        status: 'error',
        error,
      });
    }
  } else if (req.method === 'POST') {
    return res.json({ status: 'success' });
  }

  return res.status(405);
}
