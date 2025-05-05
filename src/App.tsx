import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import RecipeReviewCard from "./components/recipes";
import { Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import Test from "./components/test"
import MyRouter from "./Router";

function App() {
  return (
      <>
      <RouterProvider router={MyRouter}/>
      </>
  );
}

export default App;
