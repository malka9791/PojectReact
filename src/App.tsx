import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./App.css";
import Login from "./pages/login";
import Home from "./pages/Home";
import RecipeReviewCard from "./pages/recipes";
import { Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Test from "./components/test";
import MyRouter from "./Router";

function App() {
  return (
    <>
      <RouterProvider router={MyRouter} />
    </>
  );
}

export default App;
