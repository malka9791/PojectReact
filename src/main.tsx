import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import Login from "./components/login.tsx";
import SignIn from "./components/signin.tsx";
import Home from "./components/Home.tsx";
import { LoginProvider } from "./components/login.tsx";
import AboutUs from "./components/aboutUs.tsx";
import RecipeReviewCard from "./components/recipes.tsx";
import AddRecipe from "./components/addrecipe.tsx";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Navigate to="/home"></Navigate>,
      },
    ],
  },
  {
    path: "home",
    element: <Home />,
    children: [
      {
        path: "login",
        element: <Login />,
      },

      { path: "recipes", element: <RecipeReviewCard /> },
    ],
  },
  { path: "about", element: <AboutUs /> },
  {
    path: "login",
    element: <Login />,
  },
  { path: "signin", element: <SignIn /> },
  { path: "addrecipe", element: <AddRecipe /> },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoginProvider>
      <RouterProvider router={Routes} />
    </LoginProvider>
  </StrictMode>
);
