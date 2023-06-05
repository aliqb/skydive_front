import PanelShell from "../../components/shared/PanelShell"
import UserHeader from "../../components/userPanel/UserHeader"
import UserSideber from "../../components/userPanel/UserSidebar"

const UserPanelContainer: React.FC = ()=>{
    return(
        <PanelShell header={UserHeader} sidebar={UserSideber} mainContinerClassName="bg-slate-100">
            <div className="h-[1000px]">
                main
            </div>
        </PanelShell>
    )
}

export default UserPanelContainer