import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RecipeReviewCard from "./components/recipes";
import AboutUs from "./components/aboutUs";
import Login from "./components/login";
import AddRecipe from "./components/addrecipe";
import Home from "./components/Home";
import Test from "./components/test";
import SignUp from "./components/signup";

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
        {path:"a",element:<Test/>}
        ]

    }
])
export default MyRouter