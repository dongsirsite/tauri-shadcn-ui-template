import App from "@/App";
import Layout from "@/Layout";
import { createBrowserRouter } from "react-router";
function Home() {
  return <div>Hello World</div>;
}
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
        { index: true, Component: Home },
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
