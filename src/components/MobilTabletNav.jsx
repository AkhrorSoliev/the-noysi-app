import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../hooks/useGlobalContext";

import {
  MdOutlineSpaceDashboard,
  MdAddCircle,
  MdSettings,
} from "react-icons/md";

function MobilTabletNav() {
  const { messageInputFocus } = useGlobalContext();

  return (
    <>
      {!messageInputFocus && (
        <nav className="fixed bottom-5 left-1/2 w-full max-w-[95%] -translate-x-1/2 rounded-3xl bg-base-100 px-4 shadow-md lg:hidden">
          <div className="menu menu-horizontal w-full justify-between">
            <li>
              <NavLink to="/">
                <MdOutlineSpaceDashboard className="text-2xl" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/create">
                <MdAddCircle className="text-2xl" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile">
                <MdSettings className="text-2xl" />
              </NavLink>
            </li>
          </div>
        </nav>
      )}
    </>
  );
}

export default MobilTabletNav;
