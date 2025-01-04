import { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { MdOutlineExitToApp } from "react-icons/md";
import { useSignout } from "../hooks/useSignout";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Link } from "react-router-dom";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
};

function MobileHeader() {
  const { user } = useGlobalContext();
  const { signout } = useSignout();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(themeFromLocalStorage());

  const changeTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dracula" : "light";
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-0 flex w-full -translate-x-1/2 items-center justify-between px-5 py-4 transition duration-300 md:hidden ${
        isScrolled ? "h-[80px] bg-base-100 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost"
        >
          <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            <img src={user.photoURL} alt={user.displayName} />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-1 w-52 rounded-box bg-base-100 p-3 shadow"
        >
          <li>
            <Link to="/onlineUsers">Online Users</Link>
          </li>
          <li>
            {theme == "light" && (
              <button onClick={changeTheme}>
                Theme: night <IoMdMoon />
              </button>
            )}
            {theme == "dracula" && (
              <button onClick={changeTheme}>
                Theme: Sun <IoMdSunny />
              </button>
            )}
          </li>
        </ul>
      </div>
      <button className="btn" onClick={signout}>
        <MdOutlineExitToApp className="text-3xl" />
      </button>
    </header>
  );
}

export default MobileHeader;
