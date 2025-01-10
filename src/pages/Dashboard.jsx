import { useCollection } from "../hooks/useCollection";

function Dashboard() {
  const { documents } = useCollection("projects");
  console.log(documents);

  if (!documents) {
    return (
      <div className="align-elements">
        <h1 className="text-3xl font-medium">Loading...</h1>
      </div>
    );
  }
  return (
    <section>
      <div className="align-elements">
        {documents && <h1 className="text-3xl font-medium">Dashboard</h1>}
      </div>
    </section>
  );
}

export default Dashboard;
