import { FirebaseApp } from 'firebase/app';
import { app, credential } from 'firebase-admin';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = require('./secrets/all-mbs-firebase-adminsdk-bf0ta-367700e397.json');

const apps = getApps().map((item) => item.name);

let adminApp;
if (!apps.includes('admin')) {
  console.log(1);
  adminApp = initializeApp(
    {
      credential: credential.cert(serviceAccount),
      projectId: 'all-mbs',
    },
    'admin'
  );
} else {
  adminApp = getApps().filter((item) => item.name === 'admin')[0];
}

export const db = getFirestore(adminApp);
export const auth = getAuth(adminApp);
