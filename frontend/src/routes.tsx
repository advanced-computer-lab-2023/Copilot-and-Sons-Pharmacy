import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { AuthRoutes } from "./features/auth/routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="auth/*" element={<AuthRoutes />} />
    </>
  )
);
