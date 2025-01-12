import { IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { Timestamp } from "firebase/firestore";
import { useFirestore } from "../hooks/useFirestore";
import { v4 as uuidv4 } from "uuid";

function ProjectChat({ id, comments }) {
  const { dispatch, user } = useGlobalContext();
  const { updateDocument } = useFirestore("projects");
  const [errorArea, setErrorArea] = useState(false);
  const textareaRef = useRef();
  const messagesEndRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (textareaRef.current.value.trim() === "") {
      setErrorArea(true);
      return;
    }

    const comment = {
      content: textareaRef.current.value,
      createdAt: Timestamp.fromDate(new Date()),
      createdBy: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      },
      id: uuidv4(),
    };

    await updateDocument(id, {
      comments: [...comments, comment],
    });

    textareaRef.current.value = "";
  };

  const handleFocus = () => {
    dispatch({ type: "MESSAGE_INPUT_FOCUS", payload: true });
  };

  const handleBlur = () => {
    dispatch({ type: "MESSAGE_INPUT_FOCUS", payload: false });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  return (
    <div className="md:w-1/2">
      <h3 className="mb-5 text-center text-2xl font-medium md:hidden">
        Discussion
      </h3>
      <div className="max-h-[300px] overflow-y-auto rounded-lg bg-base-200 px-3 py-2 md:max-h-[400px]">
        {comments.length ? (
          <>
            {comments.map((comment) => {
              const { createdBy, content, id } = comment;
              return (
                <div
                  key={id}
                  className={`chat ${user.uid === comment.createdBy.uid ? "chat-end" : "chat-start"}`}
                >
                  <div className="avatar chat-image">
                    <div className="w-10 rounded-full">
                      <img
                        src={createdBy.photoURL}
                        alt={`${createdBy.displayName} avatar`}
                      />
                    </div>
                  </div>
                  <div className="chat-header">
                    {createdBy.displayName}
                    <time className="ml-1 text-xs italic opacity-50">
                      {comment.createdAt.toDate().toLocaleString()}
                    </time>
                  </div>
                  <div className="chat-bubble">{comment.content}</div>
                </div>
              );
            })}
          </>
        ) : (
          <p className="text-center">No comments yet</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <form onSubmit={handleSubmit}>
        <label className="form-control mb-5">
          <div className="label">
            <span className="label-text">Message:</span>
          </div>
          <textarea
            ref={textareaRef}
            className={`textarea textarea-bordered h-24 leading-normal ${
              errorArea ? "textarea-error" : ""
            }`}
            onKeyDown={handleKeyDown}
            placeholder="Type here"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              if (e.target.value.trim().length > 0) {
                setErrorArea(false);
              }
            }}
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
