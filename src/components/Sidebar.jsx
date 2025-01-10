import Avatar from "./Avatar";
import {
  MdOutlineSpaceDashboard,
  MdAddCircle,
  MdSettings,
} from "react-icons/md";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { NavLink } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import { useThemeToggler } from "../hooks/useThemeToggler";

import { FaRegMoon, FaRegSun } from "react-icons/fa";

function Sidebar() {
  const { user } = useGlobalContext();
  const { document } = useDocument("users", user.uid);
  const { changeTheme, theme } = useThemeToggler();

  return (
    <div className="hidden w-64 shrink-0 flex-col bg-primary-content bg-opacity-50 p-2 pr-0 pt-10 dark:bg-neutral-content lg:flex">
      <Avatar user={document} />
      <ul className="menu mb-auto flex flex-col gap-4 rounded-r-none p-0 pl-8">
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl py-2 pl-2 text-xl dark:bg-base-300"
            to="/"
          >
            <MdOutlineSpaceDashboard />{" "}
            <span className="font-semibold">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl py-2 pl-2 text-xl dark:bg-base-300"
            to="/create"
          >
            <MdAddCircle /> <span className="font-semibold">Create</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className="flex w-full items-center gap-3 rounded-none rounded-l-3xl py-2 pl-2 text-xl dark:bg-base-300"
            to="/profile"
          >
            <MdSettings /> <span className="font-semibold">Settings</span>
          </NavLink>
        </li>
      </ul>

      {/* this hidden checkbox controls the state */}
      <label className="mb-5 flex cursor-pointer justify-center gap-2">
        {/* sun icon */}
        <FaRegSun className="swap-on h-5 w-5 fill-current" />
        <input
          onChange={changeTheme}
          type="checkbox"
          value="synthwave"
          checked={theme == "dracula"}
          className="theme-controller toggle"
        />
        {/* moon icon */}
        <FaRegMoon className="swap-off h-5 w-5 fill-current" />
      </label>
    </div>
  );
}

export default Sidebar;
