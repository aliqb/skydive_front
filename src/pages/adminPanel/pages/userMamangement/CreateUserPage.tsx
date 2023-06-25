import UserForm from "../../../../components/adminPanel/userManagement/UserForm";
import SDCard from "../../../../components/shared/Card";

const CreateUserPage: React.FC = () => {
  return (
    <SDCard className="pt-0 px-0 pb-2 border border-blue-100">
      <div className="  py-5 px-10 bg-blue-900 text-white rounded-t-lg" >
        <h6 className="font-bold text-lg ">کاربر جدید</h6>
      </div>
      <div className="px-2 xs:px-4 lg:px-12 mt-12">
        <UserForm />
      </div>
    </SDCard>
  );
};

export default CreateUserPage;
