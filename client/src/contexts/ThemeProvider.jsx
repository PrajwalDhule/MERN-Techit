import { createContext, useContext, useState, useEffect, useRef } from "react";
import { UserContext } from "../App";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });
  
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const { userState, dispatch } = useContext(UserContext);
  let timeoutRef = useRef(null)

  useEffect(() => {
    if (userState?.theme) {
      setTheme(userState.theme);
      timeoutRef.current = setTimeout(() => {
        updateUserTheme(userState.theme);
      }, 1500); 
    } else {
      const stored = localStorage.getItem("techit-theme");
      if (stored === "dark" || stored === "light") setTheme(stored);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [userState?.theme]);

  const updateUserTheme = (theme) => { 
    fetch("/updatetheme", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        theme,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);

    if (userState) {
        const userFromLocalStorage = JSON.parse(localStorage.getItem("techit-user"));
        const data = {
          ...userFromLocalStorage,
          theme: next,
        };
        localStorage.setItem("techit-user", JSON.stringify(data));
        dispatch({
          type: "UPDATETHEME",
          payload: next,
        });
    } else {
      localStorage.setItem("techit-theme", next);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={`${theme}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);