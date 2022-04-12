import { db, auth } from '../../../utils/firebase-admin';

export default async function handler(req, res) {
  const { uid } = req.query;
  if (req.method === 'DELETE') {
    try {
      await auth.deleteUser(uid);
      return res.json({ status: 'success', message: `user ${uid} deleted` });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error,
      });
    }
  }

  return res.status(405);
}
