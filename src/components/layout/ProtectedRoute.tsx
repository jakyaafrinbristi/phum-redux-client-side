import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router";
import { useCurrentToken } from "../../redux/features/auth/authSlice";


const ProtectedRoute = ({children} : {children:ReactNode}) => {
 
    const token = useAppSelector(useCurrentToken);

    if(!token){
        return <Navigate to='/login' replace={true}></Navigate>
    }

  return children;
}

export default ProtectedRoute