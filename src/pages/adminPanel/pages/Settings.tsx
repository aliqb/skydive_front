import GeneralSettings from "../../../components/adminPanel/settings/GeneralSettings";
import UserTypeSettings from "../../../components/adminPanel/settings/UserTypeSettings";

const Settings: React.FC = () => {
  return (
    <div className="flex flex-wrap">
      <section className="w-full lg:w-1/2 p-2">
        <GeneralSettings />
      </section>
      <section className="w-full lg:w-1/2 p-2">
        <UserTypeSettings />
      </section>
    </div>
  );
};

export default Settings;
