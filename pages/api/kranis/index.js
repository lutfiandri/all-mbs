import { db, auth } from '../../../utils/firebase-admin';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = [];

      const listUsersResult = await auth.listUsers(1000);
      listUsersResult.users.forEach((userRecord) => {
        const user = {
          email: userRecord.email || null,
          name: userRecord.displayName,
          uid: userRecord.uid,
        };
        data.push(user);
      });

      const kranis = data.filter((d) => !d.email.includes('admin'));

      return res.json({ status: 'success', data: kranis });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: 'error',
        error,
      });
    }
  } else if (req.method === 'POST') {
    const { name, email, password } = req.body;
    try {
      const userRecord = await auth.createUser({
        email: email,
        password: password,
        displayName: name,
      });
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

const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  const data = [];
  return new Promise((resolve, reject) => {
    auth
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach((userRecord) => {
          const user = userRecord.providerData;
          data.push(user);
          console.log('user', user.toJSON());
        });
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
