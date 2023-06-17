import { Link, Outlet } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";

const UserPanelContainer: React.FC = () => {
  return (
    <>
      <UserHeader></UserHeader>
      {<Outlet></Outlet> }
    </>
  );
};

export default UserPanelContainer;
