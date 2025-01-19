import { sendEmailVerification } from "firebase/auth";
import { checkerrorCode } from "../utils";
import { auth } from "../firebase/firebaseConfig";
import { useState } from "react";
import toast from "react-hot-toast";

export function useEmailVerification() {
  const [isPending, setIsPending] = useState(false);

  const sendVerification = async () => {
    setIsPending(true);
    try {
      await sendEmailVerification(auth.currentUser, {
        url: "https://nnoysi.vercel.app/login",
      });
      toast.success("Verification email sent");
      toast("Please check your email and verify your account");
    } catch (error) {
      checkerrorCode(error.code);
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { sendVerification, isPending };
}
