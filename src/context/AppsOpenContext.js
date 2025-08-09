"use client";
import { createContext, useContext, useState } from "react";

const AppsOpenContext = createContext();

export const AppsOpenContextProvider = ({ children }) => {
  const [arrayAppsOpenContext, setArrayAppsOpenContext] = useState([]);

  return (
    <AppsOpenContext.Provider
      value={{ arrayAppsOpenContext, setArrayAppsOpenContext }}
    >
      {children}
    </AppsOpenContext.Provider>
  );
};

export const useAppsOpenContext = () => useContext(AppsOpenContext);
