
import { createBrowserRouter } from "react-router-dom";
import Overview from "../user/Overview";
import Transactions from "../user/Transactions";
import Root from "../components/Root";
import SignUp from "../SignUp";
import SignIn from "../SignIn";

const router = createBrowserRouter([
    {
        path:"/",
        element:<Root></Root>,
        children:[
            {
                path:"/",
                element:<Overview></Overview>
            },
            {
                path:"/transactions",
                element:<Transactions></Transactions>
            },
            {
                path:"/signin",
                element:<SignIn></SignIn>
            },
            
            {
                path:"/signUp",
                element:<SignUp></SignUp>
            }
        ]
    }
])
export default router;