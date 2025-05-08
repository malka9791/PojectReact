import { Outlet } from "react-router-dom";
import Header from "./header";
import { LoginProvider } from "../hooks/loginContext";

const AppLayout = () => {
  return (
    <LoginProvider>
      <Header />
      <Outlet />
    </LoginProvider>
  );
};
export default AppLayout;
