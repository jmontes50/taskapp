import {
  collection,
  addDoc,
  query,
  getDoc,
  updateDoc,
  where,
  getDocs,
  doc
} from "firebase/firestore";
import { db } from "../config/firebase";

const addDocument = async (collectionName, data) => {
  console.log({ data });
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

const getDocuments = async (collectionName = "tasks", uid) => {
  const q = query(
    collection(db, collectionName),
    where("uid", "==", uid)
    // orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const docs = [];
  querySnapshot.forEach((doc) => {
    docs.push({ id: doc.id, ...doc.data() });
  });
  return docs;
};

const getDocument = async (collectionName = "tasks", id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    console.log("No such document!");
    return null;
  }
};

const updateDocument = async (collectionName = tasks, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, data);
    return true;
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

export { addDocument, getDocuments, getDocument, updateDocument };
