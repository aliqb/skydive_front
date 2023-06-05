import HumbergetButton from "../shared/HumbergerButtom";
import { ShellElement } from "../shared/PanelShell";

const UserHeader: React.FC<ShellElement> = (props) => {
  return (
    <div className="bg-primary-500 h-[50px] flex items-center">
      <HumbergetButton {...props}></HumbergetButton>
      {props.isMenuOpen ? "true" : "false"}
    </div>
  );
};

export default UserHeader;
