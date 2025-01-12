import { useState } from "react";

const filters = [
  "all",
  "mine",
  "frontend",
  "backend",
  "design",
  "marketing",
  "others",
];

function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState("all");
  return (
    <div className="mb-5 overflow-x-auto pb-1">
      <div role="tablist" className="tabs tabs-bordered">
        {filters.map((filter) => (
          <button
            onClick={() => {
              changeFilter(filter);
              setCurrentFilter(filter);
            }}
            key={filter}
            role="tab"
            aria-selected="true"
            className={`tab-bordered tab rounded-t-md font-medium ${currentFilter === filter ? "tab-active bg-base-300" : ""}`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectFilter;
