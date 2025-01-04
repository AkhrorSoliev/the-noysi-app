import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { checkerrorCode } from "../utils";
import toast from "react-hot-toast";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { useFirestore } from "./useFirestore";

export function useAuthWithGoogle() {
  const { dispatch } = useGlobalContext();
  const [isPending, setIsPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { addUserDocument, state } = useFirestore("users");

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  const authenticateWithGoogle = async () => {
    setIsPending(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (result) {
        await addUserDocument(result.user);
      }

      if (!isCancelled) {
        const user = result.user;
        dispatch({ type: "LOGIN", payload: user });
        toast.success("Welcome to the Noysi");
        setIsPending(false);
      }
    } catch (error) {
      console.log(error.errorCode);
      console.log(error.message);
      checkerrorCode(error.code);
    } finally {
      if (!isCancelled) {
        setIsPending(false);
      }
    }
  };

  return { authenticateWithGoogle, isPending };
}
