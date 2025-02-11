import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router";
import { logout, selectCurrentUser, useCurrentToken } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";


type TProtectedRoute ={
  children:ReactNode;
  role:string | undefined
}

const ProtectedRoute = ({children ,role} : TProtectedRoute) => {
 
    const token = useAppSelector(useCurrentToken);
    let user;
    if(token){
      user = verifyToken(token);
    }
    console.log(user)
    // const user = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();

    if(role !== undefined && role !== user ?. role){
      dispatch(logout());
      return <Navigate to='/login' replace={true}></Navigate>
    }

    if(!token){
        return <Navigate to='/login' replace={true}></Navigate>
    }

  return children;
}

export default ProtectedRoute