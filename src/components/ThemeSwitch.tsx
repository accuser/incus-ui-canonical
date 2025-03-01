import { Icon } from "@canonical/react-components";
import { FC, useEffect, useState } from "react";

const Themes = {
  dark: "dark",
  light: "light",
  // paper: "paper",
} as const;

type Theme = keyof typeof Themes;

const ThemeSwitch: FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === Themes.dark) {
      return Themes.dark;
    } else if (savedTheme === Themes.light) {
      return Themes.light;
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? Themes.dark
        : Themes.light;
    }
  });

  const handleThemeChange = () => {
    const newTheme = theme === Themes.light ? Themes.dark : Themes.light;
    setTheme(newTheme);
  };

  useEffect(() => {
    if (theme === Themes.dark) {
      document.documentElement.classList.add("is-dark");
    } else {
      document.documentElement.classList.remove("is-dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "t") {
        handleThemeChange();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? Themes.dark : Themes.light);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () =>
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  return (
    <>
      <a
        className="p-side-navigation__link"
        title="Toggle theme"
        onClick={() => {
          handleThemeChange();
        }}
      >
        <Icon
          className="is-light p-side-navigation__icon "
          name={theme === Themes.dark ? "highlight-off" : "highlight-on"}
        />
        Toggle dark mode
      </a>
    </>
  );
};

export default ThemeSwitch;
