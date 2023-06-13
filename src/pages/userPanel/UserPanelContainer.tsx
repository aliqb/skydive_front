import { Outlet } from "react-router-dom";
import PanelShell from "../../components/shared/PanelShell";
import UserHeader from "../../components/userPanel/UserHeader";
import UserSideber from "../../components/userPanel/UserSidebar";

const UserPanelContainer: React.FC = () => {
  return (
    <>
      <UserHeader></UserHeader>
       <Outlet></Outlet>
    </>
    //     <PanelShell header={UserHeader} sidebar={UserSideber} mainContinerClassName="bg-slate-100 p-2  xs:p-6" sidBarContainerClassName="bg-white">
    //         <Outlet></Outlet>
    //     </PanelShell>
  );
};

export default UserPanelContainer;
