import { createContext, ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type LoginContextType = {
  name: string | null;
  setName: (name: string) => void;
  isLogin: string | null;
  setIsLogin: (islogin: string) => void;
};

export const LoginContext = createContext<LoginContextType>({
  name: "?",
  isLogin: null,
  setName: function (name: string): void {
    this.name = name;
    throw new Error("Function not implemented.");
  },
  setIsLogin: function (islogin: string): void {
    this.isLogin = islogin;
    throw new Error("Function not implemented.");
  },
});

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [name, setName] = useState<string | null>("?");
  const [isLogin, setIsLogin] = useState<string | null>("");
  const getUserData = () => {
    const storedName = localStorage.getItem("name") || "?";
    const storeIsLogin = localStorage.getItem("isLogin") || null;

    setIsLogin(storeIsLogin);
    setName(storedName);
  };
  const updateData = () => {
    getUserData();
    // עדכון נתונים
  };
  useEffect(() => {
    window.addEventListener("dataUpdated", updateData);

    return () => {
      window.removeEventListener("dataUpdated", updateData);
    };
  }, []);
  const location = useLocation();

  useEffect(() => {
    getUserData(); // טען כל פעם שמנתבים דף
  }, [location]);
  return (
    <LoginContext.Provider value={{ name, setName, isLogin, setIsLogin }}>
      {children}
    </LoginContext.Provider>
  );
};
