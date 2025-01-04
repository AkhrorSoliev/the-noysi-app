import { useContext } from "react";
import { GlobalContext } from "../context/context";

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw Error("useContext() must be used inside an ContextProvider");
  }
  return context;
}
