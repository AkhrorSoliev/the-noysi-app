import { useReducer, useEffect, useState } from "react";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "IS_PENDING":
      return {
        document: null,
        isPending: true,
        error: null,
        success: false,
      };
    case "ADDED_DOCUMENT":
      return {
        document: payload,
        isPending: false,
        error: null,
        success: true,
      };
    case "DELETED_DOCUMENT":
      return {
        document: null,
        isPending: false,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        document: null,
        isPending: false,
        error: payload,
        success: false,
      };
    case "UPDATED_DOCUMENT":
      return {
        document: payload,
        isPending: false,
        error: null,
        success: true,
      };
    default:
      return state;
  }
};

export function useFirestore(collectionName) {
  const [state, dispatch] = useReducer(changeState, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const dispatchIfNotCanceled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  const addDocument = async (document) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const addedDocument = await addDoc(
        collection(db, collectionName),
        document,
      );
      dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: addedDocument });
      toast.success("Added successfully");
    } catch (error) {
      console.log(error);
      dispatchIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, collectionName, id));
      dispatchIfNotCanceled({ type: "DELETED_DOCUMENT" });
      toast.success("Deleted successfully");
    } catch (error) {
      console.log(error);
      dispatchIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const updateDocument = async (id, document) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const updatedDocument = await updateDoc(
        doc(db, collectionName, id),
        document,
      );
      dispatchIfNotCanceled({
        type: "UPDATED_DOCUMENT",
        payload: updatedDocument,
      });
      toast.success("Updated successfully");
    } catch (error) {
      console.log(error.message);
      dispatchIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  const addUserDocument = async (userDocument) => {
    dispatch({ type: "IS_PENDING" });

    const user = {
      diplayName: userDocument.displayName,
      email: userDocument.email,
      emailVerified: userDocument.emailVerified,
      phoneNumber: userDocument.phoneNumber || false,
      createdAt: userDocument.metadata.creationTime,
      photoURL:
        userDocument.photoURL ||
        `https://api.dicebear.com/9.x/initials/svg?seed=${userDocument.diplayName}`,
      coverURL: `https://api.dicebear.com/9.x/glass/svg?seed=${userDocument.uid}`,
      online: true,
    };

    try {
      const addedUserDocument = await setDoc(
        doc(db, collectionName, userDocument.uid),
        user,
      );
      dispatchIfNotCanceled({
        type: "ADDED_DOCUMENT",
        payload: addedUserDocument,
      });
    } catch (error) {
      console.log(error);
      dispatchIfNotCanceled({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  return {
    addDocument,
    deleteDocument,
    updateDocument,
    addUserDocument,
    state,
  };
}
