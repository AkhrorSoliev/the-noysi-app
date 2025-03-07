import { useState } from "react";
import { useParams } from "react-router-dom";
import { GoProjectRoadmap } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Modal, ProjectChat, ProjectContent } from "../components";
import { useDocument } from "../hooks/useDocument";
import ConfettiExplosion from "react-confetti-explosion";

export default function Project() {
  const { id } = useParams();
  const [toggle, setToggle] = useState(true);
  const { document } = useDocument("projects", id);
  console.log(document);

  if (!document) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Modal />
      {document.completed && <ConfettiExplosion />}
      <section className="align-elements">
        <div className="mb-3 hidden justify-around text-2xl font-medium md:mb-10 md:flex md:text-3xl">
          <h2>Project</h2>
          <h2>Discussion</h2>
        </div>
        <div className="mb-8 flex items-center gap-2 md:hidden">
          <button
            onClick={() => setToggle(true)}
            className={`btn ${!toggle && "btn-outline"} btn-primary btn-sm grow`}
          >
            <GoProjectRoadmap className="text-xl" />
          </button>
          <button
            onClick={() => setToggle(false)}
            className={`btn ${toggle && "btn-outline"} btn-primary btn-sm grow`}
          >
            <IoChatboxEllipsesOutline className="text-xl" />
          </button>
        </div>
        <div className="md:hidden">
          {toggle && <ProjectContent project={document} />}
          {!toggle && (
            <ProjectChat
              id={id}
              comments={document.comments}
              commentAccess={document.commentsAccessOnlyAssignedUsers}
            />
          )}
        </div>
        <div className="hidden justify-between gap-4 md:flex">
          <ProjectContent project={document} />
          <ProjectChat
            id={id}
            comments={document.comments}
            commentAccess={document.commentsAccessOnlyAssignedUsers}
          />
        </div>
      </section>
    </>
  );
}
