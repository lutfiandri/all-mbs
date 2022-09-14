import { db, auth } from '../../../utils/firebase-admin';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405);
  }
  try {
    const { year, month } = req.query;
    const startMonth = new Date(Number(year), Number(month));
    startMonth.setDate(1);
    startMonth.setHours(0);
    startMonth.setMinutes(0);
    startMonth.setSeconds(0);
    // console.log(startMonth.toLocaleDateString());

    const querySnapshot = await db
      .collection('harvests')
      .where('created_at', '>=', startMonth)
      .get();

    const result = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      data.id = doc.id;
      data.jumlah =
        data.matang +
        data.mengkal +
        data.mentah +
        data.lewat_matang +
        data.busuk;
      result.push(data);
    });
    res.json({ status: 'success', data: result });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      error,
    });
  }
}
