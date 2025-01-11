import { MdDelete, MdOutlineDoneOutline } from "react-icons/md";

function ProjectContent({ project }) {
  console.log(project);
  const { id, title, description, createdBy, dueDate } = project;
  return (
    <div>
      <div className="mb-5 rounded bg-base-300 p-4">
        <h3 className="mb-2 text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="mb-1 flex items-center gap-1 opacity-80">
          Creator:
          <span className="flex items-center gap-2">
            <img
              className="rounded-full"
              src={createdBy.photoURL}
              alt=""
              width={30}
              height={30}
            />
            <b>{createdBy.displayName}</b>
          </span>
        </p>
        <p className="mb-3 opacity-90 md:mb-3">
          Due to by: <b>{dueDate.toDate().toDateString()}</b>{" "}
        </p>
        <p>{description}</p>
      </div>
      <div className="flex flex-col gap-2">
        <button className="btn btn-outline btn-primary btn-sm btn-block">
          <MdOutlineDoneOutline /> Completed
        </button>
        <button className="btn btn-outline btn-secondary btn-sm btn-block">
          <MdDelete className="text-xl" /> Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectContent;
