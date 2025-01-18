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
        <h3 className="text-lg font-bold">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <button
              onClick={() => handleDelete(id)}
              type="button"
              className="btn btn-error btn-sm md:btn-md"
            >
              Delete
            </button>
            <button className="btn btn-sm md:btn-md">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
