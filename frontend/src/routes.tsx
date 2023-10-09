import { RouteObject } from "react-router-dom";

import { authRoutes } from "./features/auth/routes";
import Register from "./components/pharmacistRequest";
import GetPharmacists from "./features/auth/routes/allPharmacists";



export const routes: RouteObject[] = [
  {
    path: "/",
    element: <h1>
      home 
    </h1>,
  },
  {
    path: "/auth",
    children: authRoutes,
  },
  {
    path: "/pharmacistRequest",
    element: <h1>


      <Register />
    </h1>,
  },
  {
    path: "/getPharmacists",
    element: <h1>
      
      <GetPharmacists />    
    </h1>,
  }


 
];
