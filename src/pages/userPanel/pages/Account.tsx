import SDCard from "../../../components/shared/Card";
import { SDTabs } from "../../../components/shared/Tabs";
import AccountInfo from "../../../components/userPanel/Account/AccountInfo";

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
          <SDTabs.Item title="Dashboard">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                This is some placeholder content the
                <span className="font-medium text-gray-800 dark:text-white">
                  Dashboard tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </p>
          </SDTabs.Item>
          <SDTabs.Item title="Settings">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <p>
                This is some placeholder content the
                <span className="font-medium text-gray-800 dark:text-white">
                  Settings tab's associated content
                </span>
                . Clicking another tab will toggle the visibility of this one
                for the next. The tab JavaScript swaps classes to control the
                content visibility and styling.
              </p>
            </p>
          </SDTabs.Item>
        </SDTabs.Group>
      </SDCard>
    </div>
  );
};
export default Account;
