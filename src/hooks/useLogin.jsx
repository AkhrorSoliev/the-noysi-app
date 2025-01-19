import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { checkerrorCode } from "../utils";
import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";
import { useFirestore } from "../hooks/useFirestore";

export function useLogin() {
  const { updateDocument } = useFirestore("users");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useGlobalContext();

  const login = async (email, password) => {
    setIsPending(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: "LOGIN", payload: res.user });
      await updateDocument(res.user.uid, {
        online: true,
      });
      toast.success(`Welcome back ${res.user.displayName}`);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
      checkerrorCode(err.code);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };
  return {
    login,
    error,
    isPending,
  };
}
