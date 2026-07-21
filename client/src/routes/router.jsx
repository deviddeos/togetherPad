import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import Editor from "../pages/Editor";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: ":padId", element: <Editor /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
