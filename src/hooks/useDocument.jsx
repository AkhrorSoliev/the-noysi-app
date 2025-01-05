import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export function useDocument(collectionName, id) {
  const [document, setDocument] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, collectionName, id), (doc) => {
      setDocument({ id: doc.id, ...doc.data() });
    });

    return () => unsub();
  }, [collectionName]);

  return { document };
}
