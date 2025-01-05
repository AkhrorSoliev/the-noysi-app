import axios from "axios";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useGlobalContext } from "./useGlobalContext";
import { useFirestore } from "../hooks/useFirestore";
import { updateProfile } from "firebase/auth";

const imageBase = "https://json-api.uz/api/project/images-api/upload";

export function useUpdateProfile() {
  const [isPending, setIsPending] = useState(false);
  const { user } = useGlobalContext();
  const { updateDocument } = useFirestore("users");
  const [isCanceled, setIsCanceled] = useState(false);

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(imageBase, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  const updateUserProfile = async (profileData) => {
    setIsPending(true);
    const profile = {};

    if (profileData.displayName) profile.displayName = profileData.displayName;

    if (profileData.avatarImage)
      profile.photoURL = await uploadImage(profileData.avatarImage);
    const coverURL = profileData.coverImage
      ? await uploadImage(profileData.coverImage)
      : null;

    if (!isCanceled) {
      if (profile.displayName || profile.photoURL) console.log(profile);
      await updateProfile(user, profile);
      if (profile.displayName || profile.photoURL || coverURL) {
        await updateDocument(user.uid, {
          ...profile,
          ...(coverURL && { coverURL }),
        });
      }
      toast.success("Profile updated successfully");
    }
    setIsPending(false);
  };

  useEffect(() => () => setIsCanceled(true), []);

  return { updateUserProfile, isPending };
}
