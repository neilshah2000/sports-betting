import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OddsPage from "./OddsPage";
import LoginPage from "./LoginPage";
import FixturesPage from "./FixturesPage";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        element: <FixturesPage></FixturesPage>,
        index: true,
      },
      {
        path: "/odds/:fixtureId",
        element: <OddsPage></OddsPage>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
