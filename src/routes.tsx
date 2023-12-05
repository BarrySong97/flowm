import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AppLayout from "./layout";
import Transactions from "./pages/Transactions";
import Account from "@/pages/Accounts";
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
        path: "/transactions",
        Component: Transactions,
      },
      {
        path: "/accounts",
        Component: Account,
      },
    ],
  },
];
const router = createBrowserRouter(routeObject);

export default router;
