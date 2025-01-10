import React from "react";
import { Link } from "react-router-dom";

function ProjectList({ projects }) {
  console.log(projects);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => {
        const { id, title, dueDate, assignedUsersList } = project;
        return (
          <Link
            className="project-card rounded-xl bg-base-200 transition duration-300 hover:scale-[1.01] hover:shadow-xl"
            to={`/project/${id}`}
            key={id}
          >
            <div className="mb-10 p-2 md:p-4">
              <h3 className="mb-2 line-clamp-1 text-xl font-medium">{title}</h3>
              <p className="line-clamp-1">
                Due by: {dueDate.toDate().toDateString()}
              </p>
            </div>
            <hr />
            <div className="avatar-group -space-x-6 p-2 md:p-4 rtl:space-x-reverse">
              {assignedUsersList.map((user) => (
                <div key={user.photoURL} className="avatar">
                  <div className="w-10 md:w-12">
                    <img src={user.photoURL} />
                  </div>
                </div>
              ))}
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProjectList;
