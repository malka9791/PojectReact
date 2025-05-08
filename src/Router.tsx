import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RecipesCards from "./pages/recipes";
import AboutUs from "./pages/aboutUs";
import Login from "./pages/login";
import AddRecipe from "./pages/addrecipe";
import Home from "./pages/Home";
import SignUp from "./pages/signup";
import RecipeDetailPage from "./pages/recipeDetail";
import UpdateRecipe from "./pages/updateRecipe";
import MyRecipe from "./pages/myRecipes";

const MyRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      { path: "home", element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "recipes", element: <RecipesCards /> },
      { path: "myRecipes", element: <MyRecipe /> },
      { path: "about", element: <AboutUs /> },
      {
        path: "login",
        element: <Login />,
      },
      { path: "addrecipe", element: <AddRecipe /> },
      { path: "recipedetail/:recipeId", element: <RecipeDetailPage /> },
      { path: "update/:recipeId", element: <UpdateRecipe /> },
    ],
  },
]);
export default MyRouter;
