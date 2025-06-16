import { createBrowserRouter } from "react-router";
import RootLayout from "./Layouts/RootLayout";
import Home from "./Components/Home";
import MyArticles from "./Components/MyArticles";
import PostArticles from "./Components/PostArticles";
import About from "./Components/About";
import AllArticles from "./Components/AllArticles";
import Register from "./Pages/Register";
import Login from "./Pages/Login";

const router = createBrowserRouter([
    {
        path:'/',
        Component:RootLayout,
        children:[
            {
                index:true,
                Component:Home
            },
            {
                path:'allArticles',
                Component:AllArticles

            },
            {
                path:'register',
                element:<Register></Register>

            },
            {
                path:'login',
                element:<Login></Login>

            },
            {
                path:'myArticles',
                element:<MyArticles></MyArticles>

            },
            {
                path:'postArticles',
                element:<PostArticles></PostArticles>

            },
            {
                path:'about',
                Component:About
            }
        ]
    }
]);

export default router;