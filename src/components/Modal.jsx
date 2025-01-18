import { useNavigate, useParams } from "react-router-dom";
import { useFirestore } from "../hooks/useFirestore";

function Modal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { deleteDocument } = useFirestore("projects");

  const handleDelete = async (id) => {
    navigate("/");
    await deleteDocument(id);
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <p className="text-md py-4 text-center font-semibold md:text-2xl">
          Are you sure you want to delete this project?
        </p>
        <div className="modal-action">
          <form method="dialog">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleDelete(id)}
                type="button"
                className="btn btn-error btn-sm md:btn-md"
              >
                Delete
              </button>
              <button className="btn btn-sm md:btn-md">Close</button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
