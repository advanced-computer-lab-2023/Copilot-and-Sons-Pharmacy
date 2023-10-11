import { RouteObject } from "react-router-dom";
import { Login } from "./Login";
import RegistrationForm  from "./RegistrationForm";
import { Register } from "../../../components/pharmacistRequest";
import {Formik} from 'formik'

export const authRoutes: RouteObject[] = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: 'register',
    element: <RegistrationForm />,
  },
  {
    path: 'register-request',
    element: < Register/>,
  }
];
