import { useCollection } from "../hooks/useCollection";
import { ProjectList, ProjectFilter } from "../components";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

function Dashboard() {
  const { documents } = useCollection("projects");

  if (!documents) {
    return (
      <div className="align-elements">
        <h1 className="text-2xl font-medium md:text-3xl">Loading...</h1>
      </div>
    );
  }
  return (
    <section>
      <div className="align-elements">
        {documents && (
          <h1 className="mb-10 text-2xl font-medium md:mb-20 md:text-3xl">
            Dashboard
          </h1>
        )}
        {documents.length ? <ProjectFilter /> : ""}
        {documents.length ? (
          <ProjectList projects={documents} />
        ) : (
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl md:text-3xl">No projects yet</h2>
            <Link to="/create" className="btn btn-secondary btn-sm md:btn-md">
              <IoMdAdd className="text-xl" /> Create
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default Dashboard;
