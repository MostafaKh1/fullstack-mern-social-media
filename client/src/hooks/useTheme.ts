import { useState, useEffect } from "react";

export default function useTheme() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return {
    theme,
    switchTheme,
  };
}
