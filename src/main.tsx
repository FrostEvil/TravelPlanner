import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TravelPlannerPage from "./pages/TravelPlannerPage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { SidebarProvider } from "./components/ui/sidebar";

const el = document.getElementById("root")!;
const root = createRoot(el);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <TravelPlannerPage />,
  },
]);

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* <SidebarProvider defaultOpen={true}> */}
      <RouterProvider router={router} />
      <Toaster />
      {/* </SidebarProvider> */}
    </QueryClientProvider>
  </StrictMode>
);

//className="absolute top-0 h-fit"
