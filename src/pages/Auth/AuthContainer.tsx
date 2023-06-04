import { Outlet } from "react-router-dom";

export default function AuthContainer() {
  return (
    <div className="container px-1 m-auto flex justify-center items-center h-full">
      <div className="w-full sm:w-5/6 flex flex-col items-center max-w-lg rounded-md border">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
