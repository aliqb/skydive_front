import { Link, Outlet } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";

const UserPanelContainer: React.FC = () => {
  return (
    <>
      <UserHeader></UserHeader>
      <Link to="auth">ff</Link>
      {<Outlet></Outlet> }
    </>
  );
};

export default UserPanelContainer;
