import {
  MdDelete,
  MdOutlineDoneOutline,
  MdOutlineCancel,
} from "react-icons/md";
import { Modal } from "./";

import { useFirestore } from "../hooks/useFirestore";
import toast from "react-hot-toast";

function ProjectContent({ project }) {
  const { updateDocument, deleteDocument } = useFirestore("projects");
  const { id, title, description, createdBy, dueDate, completed } = project;

  const handleComplete = async (id) => {
    await updateDocument(id, {
      completed: !completed,
    });
    toast.success("Project status changed");
  };

  return (
    <>
      <Modal />
      <div className="md:w-1/2">
        <h3 className="mb-5 text-center text-2xl font-medium md:hidden">
          Project
        </h3>
        <div className="mb-5 rounded bg-base-300 p-4">
          <h3 className="mb-2 text-2xl font-bold md:text-3xl">{title}</h3>
          <p className="mb-1 flex items-center gap-1 opacity-80">
            Creator:
            <span className="flex items-center gap-2">
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={createdBy.photoURL}
                alt=""
              />
              <b>{createdBy.displayName}</b>
            </span>
          </p>
          <p className="mb-3 opacity-90 md:mb-3">
            Due to by: <b>{dueDate.toDate().toDateString()}</b>{" "}
          </p>
          <p>{description}</p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row">
          <button
            onClick={() => handleComplete(id)}
            className="btn btn-outline btn-primary btn-sm grow md:w-auto"
          >
            {!completed ? (
              <>
                <MdOutlineDoneOutline /> Completed
              </>
            ) : (
              <>
                {" "}
                <MdOutlineCancel /> Uncompleted
              </>
            )}
          </button>
          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="btn btn-outline btn-secondary btn-sm grow md:w-auto"
          >
            <MdDelete className="text-xl" />
            Delete
          </button>
        </div>
      </div>
    </>
  );
}

export default ProjectContent;
