import { db, auth } from '../../../utils/firebase-admin';

import { collection, query, getDocs } from 'firebase-admin/firestore';

export default async function handler(req, res) {
  const { uid } = req.query;
  if (req.method === 'DELETE') {
    try {
      await auth.deleteUser(uid);
      await db.collection('users').doc(uid).delete();
      return res.json({ status: 'success', message: `user ${uid} deleted` });
    } catch (error) {
      return res.json({
        status: 'error',
        error,
      });
    }
  }

  return res.status(405);
}
