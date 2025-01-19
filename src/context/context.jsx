import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const GlobalContext = createContext();

const initialState = {
  user: null,
  authIsReady: false,
  messageInputFocus: false,
};

const themeFromLocalStorage = () => {
  return localStorage.getItem("theme") || "light";
};

const changeState = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return {
        ...state,
        user: payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    case "AUTH_IS_READY":
      return {
        ...state,
        authIsReady: payload,
      };
    case "MESSAGE_INPUT_FOCUS":
      return {
        ...state,
        messageInputFocus: payload,
      };
    default:
      return state;
  }
};

export function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(changeState, initialState);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      dispatch({ type: "LOGIN", payload: user });
      dispatch({ type: "AUTH_IS_READY", payload: true });
    });
    document.documentElement.setAttribute(
      "data-theme",
      themeFromLocalStorage(),
    );
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
