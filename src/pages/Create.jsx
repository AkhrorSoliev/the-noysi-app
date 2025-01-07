import Select from "react-select";
import { useCollection } from "../hooks/useCollection";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { useFirestore } from "../hooks/useFirestore";
import { useNavigate } from "react-router-dom";

const categories = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "others", label: "Others" },
];

function Create() {
  const navigate = useNavigate();
  const { addDocument, state } = useFirestore("projects");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [commentsAccessOnlyAssignedUsers, setCommentsAccessOnlyAssignedUsers] =
    useState(false);
  const [onlyReadComments, setOnlyReadComments] = useState(false);

  const { user } = useGlobalContext();
  const { documents } = useCollection("users");
  const [users, setUsers] = useState([]);

  const handleUserSelect = (option) => {
    setSelectedUser(option.map((user) => user.value));
  };

  const hanldeCategorySelect = (option) => {
    setCategory(option.value);
  };

  useEffect(() => {
    const userOptions =
      documents &&
      documents.map((user) => ({
        value: { id: user.id, ...user },
        label: user.displayName,
      }));
    setUsers(userOptions);
  }, [documents]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      !dueDate.trim() ||
      !category ||
      !selectedUser
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    const assignedUsersList =
      selectedUser &&
      selectedUser.map((user) => ({
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.id,
      }));

    const createdBy = {
      id: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    const project = {
      title,
      description,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      category,
      createdBy,
      assignedUsersList,
      comments: [],
      commentsAccessOnlyAssignedUsers,
      onlyReadComments,
    };

    await addDocument(project);
    navigate("/");
  };

  return (
    <section>
      <div className="align-elements">
        <h1 className="mb-5 text-center text-3xl font-semibold">
          Create a new Project
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Title:*</span>
            </div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Description:*</span>
            </div>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered"
              placeholder="Type here"
            ></textarea>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Set Due to:*</span>
            </div>
            <input
              onChange={(e) => setDueDate(e.target.value)}
              type="date"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Category:*</span>
            </div>
            <Select
              onChange={hanldeCategorySelect}
              name="projectCategory"
              options={categories}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Select Users:*</span>
            </div>
            <Select
              onChange={(option) => handleUserSelect(option)}
              name="assignedUsers"
              options={users}
              className="react-select-container"
              classNamePrefix="react-select"
              isMulti
            />
          </label>
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">
                Only assign users write comments:
              </span>
              <input
                onChange={() =>
                  setCommentsAccessOnlyAssignedUsers(
                    !commentsAccessOnlyAssignedUsers,
                  )
                }
                checked={commentsAccessOnlyAssignedUsers}
                type="checkbox"
                className="checkbox"
              />
            </label>
            <label className="label cursor-pointer">
              <span className="label-text">
                Read comments on this project to all users:
              </span>
              <input
                onChange={() => setOnlyReadComments(!onlyReadComments)}
                checked={onlyReadComments}
                type="checkbox"
                className="checkbox"
              />
            </label>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Create;
