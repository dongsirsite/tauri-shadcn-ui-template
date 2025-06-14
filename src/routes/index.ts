import App from "@/page/App";
import Home from "@/page/Home";
import Layout from "@/Layout";
import { createBrowserRouter } from "react-router";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
        { path: "home", Component: Home },
        { path: "app", Component: App },
    ],
    // loader: async () => {
    //   const data = await fetchData();
    //   return data;
    // },
    // action: async ({ request }) => {
    //   const formData = await request.formData();
    //   return handleFormSubmission(formData);
    // },
  },
]);
