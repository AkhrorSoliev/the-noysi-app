import { useState } from "react";
import { useParams } from "react-router-dom";
import { GoProjectRoadmap } from "react-icons/go";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { ProjectChat, ProjectContent } from "../components";
import { useDocument } from "../hooks/useDocument";

export default function Project() {
  const { id } = useParams();
  const [toggle, setToggle] = useState(true);
  const { document } = useDocument("projects", id);

  if (!document) {
    return (
      <div className="flex items-center justify-center">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="align-elements">
      <h1 className="mb-3 text-2xl font-medium md:mb-10 md:text-3xl">
        Project
      </h1>
      <div className="mb-8 flex items-center gap-2 lg:hidden">
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
      <div>
        {toggle && <ProjectContent project={document} />}
        {!toggle && <ProjectChat />}
      </div>
    </div>
  );
}
