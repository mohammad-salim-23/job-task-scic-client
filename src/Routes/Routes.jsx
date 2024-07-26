
import { createBrowserRouter } from "react-router-dom";
import Overview from "../user/Overview";
import Transactions from "../user/Transactions";
import Root from "../components/Root";

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
            }
        ]
    }
])
export default router;