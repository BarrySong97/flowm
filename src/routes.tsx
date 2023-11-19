import { createBrowserRouter } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import AppLayout from "./layout";
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
    ],
  },
];
const router = createBrowserRouter(routeObject);

export default router;
