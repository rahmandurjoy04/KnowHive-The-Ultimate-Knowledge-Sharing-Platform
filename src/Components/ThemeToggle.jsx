import {  useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button className="btn btn-sm rounded-full" onClick={toggleTheme}>
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;