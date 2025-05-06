import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RecipeReviewCard from "./components/recipes";
import AboutUs from "./components/aboutUs";
import Login from "./components/login";
import AddRecipe from "./components/addrecipe";
import Home from "./components/Home";
import Test from "./components/test";
import SignUp from "./components/signup";
import RecipeDetailPage from "./components/recipeDetail";
import UpdateRecipe from "./components/updateRecipe";

const MyRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [{
            path: "/",
            element: <Home />
        },
        {path:"home",element:<Home/>},
        {path:"signup",element:<SignUp/>},
        { path: "recipes", element: <RecipeReviewCard /> },
        { path: "about", element: <AboutUs /> },
        {
            path: "login",
            element: <Login />,
        },
        // { path: "signin", element: <SignIn /> },
        { path: "addrecipe", element: <AddRecipe /> },
        {path:"a",element:<Test/>},
        {path:"recipedetail/:recipeId",element:<RecipeDetailPage/>},
        {path:"update/:recipeId",element:<UpdateRecipe/>}
        // {path:"updateRecipe",element:<UpdateRecipe recipeId={0}/>}

        ]

    }
])
export default MyRouter