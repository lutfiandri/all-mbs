import {
  collection,
  query,
  where,
  getDocs,
  limit,
  doc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

/**
 * get data from firestore \
 * if exist, update \
 * if not exist, create new document
 *
 * @param {*} harvest
 */
export const addHarvest = async (harvest) => {
  try {
    const initialHarvest = await getHarvest(harvest);
    // console.log(initialHarvest);
    if (initialHarvest === null) {
      await createHarvest(harvest);
    } else {
      await updateHarvest(harvest, initialHarvest);
    }
  } catch (error) {
    throw error;
  }
};

const getHarvest = async (harvest) => {
  try {
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);

    const q = query(
      collection(db, 'harvests'),
      where('nama', '==', harvest.nama),
      where('absen', '==', harvest.absen),
      where('divisi', '==', harvest.divisi),
      where('created_at', '>=', midnight),
      limit(1)
    );

    const querySnapshot = await getDocs(q);

    // if (querySnapshot.empty) return null;

    let result = null;
    querySnapshot.forEach((doc) => {
      result = doc.data();
      // console.log(result);
      result.id = doc.id;
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const updateHarvest = async (harvest, initialHarvest) => {
  const h = harvest;
  const i = initialHarvest;
  try {
    const data = {
      matang: h.matang + i.matang,
      mengkal: h.mengkal + i.mengkal,
      mentah: h.mentah + i.mentah,
      abnormal: h.abnormal + i.abnormal,
      busuk: h.busuk + i.busuk,
      brondolan: h.brondolan + i.brondolan,
      updated_at: new Date(),
    };

    const docRef = doc(db, 'harvests', initialHarvest.id);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    throw error;
  }
};

const createHarvest = async (harvest) => {
  try {
    const now = new Date();
    harvest.created_at = now;
    harvest.updated_at = now;

    await addDoc(collection(db, 'harvests'), harvest);
  } catch (error) {
    throw error;
  }
};
