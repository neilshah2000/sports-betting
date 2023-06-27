import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OddsPage from "./pages/OddsPage";
import LoginPage from "./pages/LoginPage";
import FixturesPage from "./pages/FixturesPage";
import Layout from "./layout/Layout";

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
