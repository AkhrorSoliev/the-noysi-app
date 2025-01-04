import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw Error("useContext() must be used inside an ContextProvider");
  }
  return context;
}
