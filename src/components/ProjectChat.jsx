import { IoSend } from "react-icons/io5";
import { useRef } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

function ProjectChat({ comments }) {
  const { dispatch } = useGlobalContext();
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const textareaRef = useRef();

  const handleFocus = () => {
    dispatch({ type: "MESSAGE_INPUT_FOCUS", payload: true });
  };

  const handleBlur = () => {
    dispatch({ type: "MESSAGE_INPUT_FOCUS", payload: false });
  };

  return (
    <div className="md:w-1/2">
      <h3 className="mb-5 text-center text-2xl font-medium md:hidden">
        Discussion
      </h3>
      <div className="max-h-[300px] overflow-y-auto rounded-lg bg-base-200 px-3 py-2 md:max-h-[400px]">
        <div className="chat chat-start">
          <div className="avatar chat-image">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Obi-Wan Kenobi
            <time className="text-xs opacity-50">12:45</time>
          </div>
          <div className="chat-bubble">You were the Chosen One!</div>
        </div>
        {/* Other chat messages omitted for brevity */}
      </div>
      <form onSubmit={handleSubmit}>
        <label className="form-control mb-5">
          <div className="label">
            <span className="label-text">Message:</span>
          </div>
          <textarea
            ref={textareaRef}
            className="textarea textarea-bordered h-24 leading-normal"
            placeholder="Type here"
            onFocus={handleFocus}
            onBlur={handleBlur}
          ></textarea>
        </label>
        <div className="flex justify-end">
          <button className="btn btn-primary btn-sm md:btn-md">
            Send <IoSend />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectChat;
