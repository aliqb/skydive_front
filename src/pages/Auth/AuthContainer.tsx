import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";
import Logo from "../../components/shared/Logo";

export default function AuthContainer() {
  const authState = useAppSelector((state) => state.auth);
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const authDataJson = localStorage.getItem("authData");
    setWasAuthenticated(!!authDataJson);
  }, []);
  return (authState.isAuthenticated || wasAuthenticated) &&
    !(authState.enteredPhone || authState.enteredUsername) ? (
    <Navigate to="/" />
  ) : (
    <div className="container px-1 m-auto py-1 flex justify-center items-center min-h-full">
      <div className="w-full sm:w-5/6 flex flex-col items-center max-w-lg rounded-md border">
        <div className="pt-5 border-b w-11/12 flex justify-center">
          <Logo className="w-52" />
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}
