import { Outlet } from "react-router-dom";

export default function AuthContainer() {
  return (
    <div className="container m-auto flex justify-center items-center h-full">
      <div className="w-5/6 flex flex-col items-center max-w-lg p-8 rounded-md border">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
