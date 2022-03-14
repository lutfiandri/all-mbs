import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBTTsD-E4JlzzZJfuxrUnNg2wrDEDDHBdo',
  authDomain: 'all-mbs.firebaseapp.com',
  projectId: 'all-mbs',
  storageBucket: 'all-mbs.appspot.com',
  messagingSenderId: '854451868702',
  appId: '1:854451868702:web:e05dccbd0fea8e4ce54a0f',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
