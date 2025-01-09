import { useState, useEffect } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { MdOutlineExitToApp } from "react-icons/md";
import { useSignOut } from "../hooks/useSignOut";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDocument } from "../hooks/useDocument";
import Logo from "../assets/noysi.svg";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
};

function Header() {
  const { user } = useGlobalContext();
  const { document: _document } = useDocument("users", user.uid);
  const { signout } = useSignOut();
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState(themeFromLocalStorage());

  const changeTheme = () => {
    setTheme((prev) => {
      return prev === "light" ? "dracula" : "light";
    });
  };

  useEffect(() => {
    document.body.setAttribute("class", theme);
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
      className={`fixed left-1/2 top-0 z-50 flex w-full -translate-x-1/2 items-center justify-between px-5 py-4 transition duration-300 md:sticky md:mb-10 md:-translate-x-0 md:bg-base-100 md:shadow-md ${
        isScrolled ? "h-[80px] bg-base-100 shadow-md" : "bg-transparent"
      }`}
    >
      <div className="dropdown">
        <div
          tabIndex={0}
          role="button"
          className="avatar btn btn-circle btn-ghost md:hidden"
        >
          <div className="w-12 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
            <img src={_document?.photoURL} alt={_document?.displayName} />
          </div>
        </div>
        <img
          src={Logo}
          alt="Noysi website logo"
          className="hidden w-12 rounded-full md:block"
        />
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
                Theme: Dark <IoMdMoon />
              </button>
            )}
            {theme == "dracula" && (
              <button onClick={changeTheme}>
                Theme: Light <IoMdSunny />
              </button>
            )}
          </li>
        </ul>
      </div>
      <button
        className="btn btn-sm border-0 bg-transparent md:btn-md"
        onClick={signout}
      >
        <MdOutlineExitToApp className="text-3xl" />
      </button>
    </header>
  );
}

export default Header;
