import {
    createBrowserRouter,
    
  } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import { adminPaths } from "./admin.routes";
import { routesGenerator } from "../utils/routesGenerator";
import { facultyPaths } from "./faculty.routes";
import { studentPaths } from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import { ChangePassword } from "../pages/ChangePassword";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,

    },
    {
      path: "/admin",
      element:<ProtectedRoute role="admin"> <App></App></ProtectedRoute>,
      children:routesGenerator(adminPaths)
    },
    {
      path: "/faculty",
      element: <ProtectedRoute role="faculty"> <App></App></ProtectedRoute>,
      children:routesGenerator(facultyPaths)
    },
    {
      path: "/student",
      element: <ProtectedRoute role="student"> <App></App></ProtectedRoute>,
      children:routesGenerator(studentPaths)
    },
    {
      path: "/register",
      element: <Register></Register>
    },
    {
      path: "/login",
      element: <Login></Login>
    },
    {
      path: "/change-password",
      element: <ChangePassword></ChangePassword>
    },
  ]);
  export default router;
