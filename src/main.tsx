import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import Login from "./components/login.tsx";
import SignIn from "./components/signin.tsx";
import RecipeReviewCard from "./components/recipes.tsx";
import Home from "./components/Homeatfirst.tsx";
const Routes = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    children: [
      {
        path: "login",
        element: <Login />,
        // children: [{ path: "signin", element: <SignIn /> }],
      },
      {
        path:"home",
        element:<Home/>,
        children:[{ path: "signin", element: <SignIn /> }],
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={Routes} />
);
