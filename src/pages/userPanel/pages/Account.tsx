import SDCard from "../../../components/shared/Card";
import { SDTabs } from "../../../components/shared/Tabs";
import AccountInfo from "../../../components/userPanel/Account/AccountInfo";
import Documents from "../../../components/userPanel/Account/Documnets";
import PersonalInfo from "../../../components/userPanel/Account/PersonalInfo";

const Account: React.FC = () => {
  return (
    <div>
      <SDCard >
        <SDTabs.Group
          aria-label="Tabs with underline"
          style="underline"
        >
          <SDTabs.Item active title="اطلاعات کاربری">
              <AccountInfo></AccountInfo>
          </SDTabs.Item>
          <SDTabs.Item title="اطلاعات شخصی">
              <PersonalInfo />
          </SDTabs.Item>
          <SDTabs.Item title="مدارک ارسالی">
            <Documents />
          </SDTabs.Item>
        </SDTabs.Group>
      </SDCard>
    </div>
  );
};
export default Account;
