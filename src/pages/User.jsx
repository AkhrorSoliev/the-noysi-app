import { useParams } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { MdOutlineWarning, MdDoneOutline } from "react-icons/md";

function User() {
  const { id } = useParams();
  const { document } = useDocument("users", id);

  if (!document) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section>
      <div className="align-elements">
        <div className="mb-5">
          <img
            className="h-28 w-full rounded-xl bg-orange-300 bg-center bg-no-repeat object-cover shadow-2xl md:h-36 lg:h-44"
            src={document.coverURL}
            alt={`${document.displayName} cover`}
          />
          <img
            className="mx-auto -mt-14 h-28 w-28 rounded-full object-cover shadow-2xl md:-mt-16 md:h-32 md:w-32 lg:-mt-20 lg:h-40 lg:w-40"
            src={document.photoURL}
            alt={`${document.displayName} profile avatar`}
          />
        </div>

        <div className="mb-4 flex items-center justify-center gap-1">
          <span
            className={`block h-3 w-3 rounded-full ${document.online ? "bg-green-400" : "bg-slate-500"}`}
          ></span>
          <span>{document.online ? "online" : "offline"}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div role="alert" className="alert justify-start bg-base-100">
            <p>
              User name:{" "}
              <span className="font-semibold">{document.displayName}</span>{" "}
            </p>
          </div>
          <div
            role="alert"
            className={`alert justify-start ${!document.emailVerified ? "alert-warning" : "bg-base-100"}`}
          >
            <p className="flex items-center gap-2">
              Email:
              <span className="font-semibold">{document.email}</span>
              {!document.emailVerified ? (
                <MdOutlineWarning className="text-xl" />
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
      </div>
    </section>
  );
}

export default User;
