import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "@/i18n/config";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        fallbackElement={<p>Initial Load...</p>}
      />
    </QueryClientProvider>
  );
}

export default App;
