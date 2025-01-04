import toast from "react-hot-toast";

export function checkerrorCode(errorCode) {
  if (errorCode === "auth/user-not-found") {
    return toast.error("User not found");
  } else if (errorCode === "auth/wrong-password") {
    return toast.error("Wrong password");
  } else if (errorCode === "auth/email-already-in-use") {
    return toast.error("Email already in use");
  } else if (errorCode === "auth/invalid-email") {
    return toast.error("Invalid email");
  } else if (errorCode === "auth/weak-password") {
    return toast.error("Password should be at least 6 characters");
  } else {
    return toast.error("Something went wrong");
  }
}
