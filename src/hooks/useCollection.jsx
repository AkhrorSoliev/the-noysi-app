import { useState, useEffect, useRef } from "react";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useCollection(collectionName, _query, _where) {
  const [documents, setDocuments] = useState(null);

  const _q = useRef(_query).current;
  const _w = useRef(_query).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (_q) {
      ref = query(ref, query(..._q), where(..._w));
    }

    const unsubscribe = onSnapshot(ref, (querySnapshot) => {
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(results);
    });

    return () => unsubscribe();
  }, [collectionName, _q, _w]);

  return { documents };
}
