import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { checkerrorCode } from "../utils";
import { useGlobalContext } from "./useGlobalContext";
import toast from "react-hot-toast";
import { useFirestore } from "../hooks/useFirestore";

export function useSingup() {
  const { addUserDocument } = useFirestore("users");
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useGlobalContext();

  const signup = async (displayName, email, password) => {
    console.log(email, password);
    setIsPending(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${displayName}`,
      });

      await addUserDocument(res.user);
      dispatch({ type: "LOGIN", payload: res.user });
      toast.success(`Welcome ${res.user.displayName}`);
      setIsPending(false);
    } catch (err) {
      console.log(err.message);
      console.log(err.code);
      checkerrorCode(err.code);
    } finally {
      setIsPending(false);
    }
  };

  return {
    signup,
    isPending,
  };
}
