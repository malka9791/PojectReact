import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import RecipeReviewCard from "./components/recipes";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Test from "./components/test"

function App() {
  return (
    <>
      {/* <Header />
      <br />
      <Home /> */}
      <Test/>
      <Outlet />
      {/* <RecipeReviewCard/> */}
    </>
  );
}

export default App;
