import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { routes } from "./routes";
import Providers from "./providers";

function Router() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Providers>
              <MainLayout />
            </Providers>
          }
        >

          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default Router;