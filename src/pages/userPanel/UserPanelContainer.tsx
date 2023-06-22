import {  Outlet } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";

const UserPanelContainer: React.FC = () => {
  return (
    <>
      <UserHeader></UserHeader>
      <div className="pt-[60px]"><Outlet></Outlet></div>
    </>
  );
};

export default UserPanelContainer;
