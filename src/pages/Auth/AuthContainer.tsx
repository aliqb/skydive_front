import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useEffect, useState } from "react";

export default function AuthContainer() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [wasAuthenticated, setWasAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const authDataJson = localStorage.getItem("authData");
    setWasAuthenticated(!!authDataJson);
  }, []);
  return isAuthenticated || wasAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <div className="container px-1 m-auto py-1 flex justify-center items-center min-h-full">
      <div className="w-full sm:w-5/6 flex flex-col items-center max-w-lg rounded-md border">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
