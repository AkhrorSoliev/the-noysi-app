import Avatar from "./Avatar";
import {
  MdOutlineSpaceDashboard,
  MdAddCircle,
  MdSettings,
} from "react-icons/md";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const { user } = useGlobalContext();
  return (
    <div className="hidden w-64 shrink-0 bg-primary-content bg-opacity-50 p-2 pr-0 pt-10 dark:bg-neutral-content lg:block">
      <Avatar users={user} />
      <ul className="menu flex flex-col gap-4 rounded-r-none p-0 pl-8">
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl bg-base-100 py-2 pl-2 text-xl dark:bg-base-300"
            to="/"
          >
            <MdOutlineSpaceDashboard />{" "}
            <span className="font-semibold">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl bg-base-100 py-2 pl-2 text-xl dark:bg-base-300"
            to="/create"
          >
            <MdAddCircle /> <span className="font-semibold">Create</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl bg-base-100 py-2 pl-2 text-xl dark:bg-base-300"
            to="/profile"
          >
            <MdSettings /> <span className="font-semibold">Settings</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
