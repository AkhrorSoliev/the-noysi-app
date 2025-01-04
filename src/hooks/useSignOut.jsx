import { signOut } from "firebase/auth";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { checkerrorCode } from "../utils";
import { auth } from "../firebase/firebaseConfig";
import { useFirestore } from "../hooks/useFirestore";
import toast from "react-hot-toast";

export function useSignout() {
  const { updateDocument } = useFirestore("users");
  const { dispatch, user } = useGlobalContext();
  const signout = async () => {
    dispatch({ type: "AUTH_IS_READY", payload: false });
    try {
      await updateDocument(user.uid, {
        online: false,
      });
      await signOut(auth);
      dispatch({ type: "LOGOUT" });
      toast.success("See you soon!");
    } catch (error) {
      checkerrorCode(error.code);
      console.log(error.message);
      console.log(error.code);
    } finally {
      dispatch({ type: "AUTH_IS_READY", payload: true });
    }
  };

  return { signout };
}
