import { useGlobalContext } from "../hooks/useGlobalContext";
import { useDocument } from "../hooks/useDocument";
import {
  MdOutlineWarning,
  MdDoneOutline,
  MdOutlinePhotoCamera,
} from "react-icons/md";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useEmailVerification } from "../hooks/useEmailVerification";

function Profile() {
  const { _isPending, sendVerification } = useEmailVerification();
  const { user } = useGlobalContext();
  const { document } = useDocument("users", user.uid);
  const [displayName, setDisplayName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [avatarImage, setAvatarImage] = useState(null);
  const coverInput = useRef();
  const avatarInput = useRef();

  const { updateUserProfile, isPending } = useUpdateProfile();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!displayName.trim() && !coverImage && !avatarImage) {
      toast.error("No changes made");
      return;
    }

    updateUserProfile({
      displayName,
      coverImage: coverInput.current.files[0],
      avatarImage: avatarInput.current.files[0],
    });
  };

  const handleCoverImageActive = (e) => {
    coverInput.current.click();
  };

  const handleAvtarImageActive = (e) => {
    avatarInput.current.click();
  };

  const handleGetImage = (e) => {
    const file = e.target.files[0];
    if (file.size) {
      if (file.size > 1014 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
    }
    const reader = new FileReader();

    if (e.target.id === "cover") {
      reader.onload = function (e) {
        const base64String = e.target.result;
        setCoverImage(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      reader.onload = function (e) {
        const base64String = e.target.result;
        setAvatarImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section>
      <div className="align-elements">
        <form onSubmit={handleSubmit}>
          {/* IMAGES */}
          <div className="mb-5">
            <div className="relative">
              <span
                onClick={handleCoverImageActive}
                className="absolute right-3 top-3 cursor-pointer rounded-full bg-base-100 bg-opacity-20 p-2 hover:bg-opacity-50"
              >
                <MdOutlinePhotoCamera className="text-2xl" />
              </span>
              <img
                className="h-28 w-full rounded-xl bg-orange-300 bg-center bg-no-repeat object-cover shadow-2xl md:h-36 lg:h-44"
                src={coverImage || document.coverURL}
                alt={`${document.displayName} cover`}
              />
              {/* COVER INPUT*/}
              <input
                id="cover"
                ref={coverInput}
                onChange={(e) => handleGetImage(e)}
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
              />
            </div>
            <div className="relative -mt-14 md:-mt-16 lg:-mt-20">
              <span
                onClick={handleAvtarImageActive}
                className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-base-200 bg-opacity-20 shadow-2xl hover:bg-opacity-50 md:h-32 md:w-32 lg:h-40 lg:w-40"
              >
                <MdOutlinePhotoCamera className="text-3xl" />
              </span>
              <img
                className="mx-auto -mt-14 h-28 w-28 cursor-pointer rounded-full object-cover shadow-2xl md:-mt-16 md:h-32 md:w-32 lg:-mt-20 lg:h-40 lg:w-40"
                src={avatarImage || document.photoURL}
                alt={`${document.displayName} profile avatar `}
              />
              {/* AVATAR INPUT*/}
              <input
                id="avatar"
                ref={avatarInput}
                onChange={(e) => handleGetImage(e)}
                type="file"
                accept=".jpg, .jpeg, .png"
                className="hidden"
              />
            </div>
          </div>
          {/* ONLINE STATUS */}
          <div className="mb-4 flex items-center justify-center gap-1">
            <span
              className={`block h-3 w-3 rounded-full ${document.online ? "bg-green-400" : "bg-slate-500"}`}
            ></span>
            <span>{document.online ? "online" : "offline"}</span>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                className="grow"
                placeholder="Display Name"
                onChange={(e) => setDisplayName(e.target.value)}
                defaultValue={document.displayName}
              />
            </label>
            <div
              role="alert"
              className={`alert justify-start ${!document.emailVerified ? "alert-warning" : "bg-base-100"}`}
            >
              <p className="flex items-center gap-2">
                Email:
                <span className="font-semibold">{document.email}</span>
                {!document.emailVerified ? (
                  <div className="flex items-center">
                    <MdOutlineWarning className="text-xl" />
                    <button
                      onClick={sendVerification}
                      disabled={_isPending}
                      type="button"
                      className="btn btn-outline btn-error btn-sm ml-1"
                    >
                      {_isPending ? "Sending..." : "Send"}
                    </button>
                  </div>
                ) : (
                  <MdDoneOutline className="text-xl" />
                )}
              </p>
            </div>
            <div role="alert" className="alert justify-start bg-base-100">
              <p>
                Joined:{" "}
                <span className="font-semibold">
                  {new Date(document.createdAt).toLocaleString()}
                </span>{" "}
              </p>
            </div>
            <div role="alert" className="alert justify-start bg-base-100">
              <p>
                Phone Number:{" "}
                <span className="font-semibold">
                  {document.phoneNumber || " No phone number "}
                </span>{" "}
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              disabled={isPending}
              className={`btn btn-primary mx-auto w-full max-w-96 ${isPending && "bg-slate-500"}`}
            >
              {isPending ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Profile;
