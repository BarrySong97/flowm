import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AppLayout from "./layout";
import Transactions from "./pages/Transactions";
export const routeObject = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        path: "/",
        Component: Dashboard,
      },
      {
        index: true,
        path: "/transactions",
        Component: Transactions,
      },
    ],
  },
];
const router = createBrowserRouter(routeObject);

export default router;
