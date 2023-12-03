import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { NextUIProvider } from "@nextui-org/react";
import "@/i18n/config";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider
          router={router}
          fallbackElement={<p>Initial Load...</p>}
        />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
