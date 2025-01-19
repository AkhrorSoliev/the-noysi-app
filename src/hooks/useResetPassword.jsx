import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { checkerrorCode } from "../utils";

export function useResetPassword() {
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/login",
      });
      toast.success("Check your email for reset password link");
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
      checkerrorCode(error.code);
    }
  };

  return { resetPassword };
}
