import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import ErrorPage from "./ErrorPage";
import HomePage from "./HomePage";
import GameDetailsPage from "./GameDetailsPage";

const router = createBrowserRouter([{
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
        {index: true, element: <HomePage />},
        {path: '/games/:slug', element: <GameDetailsPage />}
    ]
}]);

export default router;