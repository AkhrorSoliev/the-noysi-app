import { useState, useEffect } from "react";

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
};

export function useThemeToggler() {
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

  return { changeTheme, theme };
}
