import { Outlet } from "react-router-dom";
import PanelShell from "../../components/shared/PanelShell";
import AdminHeader from "../../components/adminPanel/AdminHeader";
import AdminSideber from "../../components/adminPanel/AdminSidebar";

const AdminPanelContainer: React.FC = () => {
  return (
    <PanelShell
      header={AdminHeader}
      sidebar={AdminSideber}
      mainContinerClassName="bg-slate-100 p-2  xs:p-6"
      sidBarContainerClassName="bg-white"
    >
      <Outlet></Outlet>
    </PanelShell>
  );
};

export default AdminPanelContainer;
