import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom"


function AuthComponent(Component: React.FC, isAuth: boolean): ReactNode {
  if (isAuth) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
}

export default AuthComponent;