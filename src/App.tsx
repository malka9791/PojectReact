import "./App.css";
import Login from "./components/login";
import Home from "./components/Home";
import RecipeReviewCard from "./components/recipes";
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import Test from "./components/test"
import Test2 from "./components/test copy";

function App() {
  return (
    <>
      <Header />
      <br />
      <Home />
      {/* <Test2/> */}
      <Outlet />
      {/* <RecipeReviewCard/> */}
    </>
  );
}

export default App;
