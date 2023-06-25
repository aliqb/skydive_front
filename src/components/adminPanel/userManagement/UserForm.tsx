import { useForm } from "react-hook-form";
import { UserDatail } from "../../../models/usermanagement.models";
import SDTextInput from "../../shared/TextInput";
import SDButton from "../../shared/Button";

interface UserFormProps {
  data?: UserDatail;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserDatail>({
    mode: "onTouched",
  });

  return (
    <form className="  text-slate-800 lg:px-8">

      <div className="flex flex-wrap justify-between">
        <div className="flex  w-full md:w-1/2 ">
          <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto md:min-w-max">
            <label htmlFor="firstName" className="mb-6 h-10 leading-10">
              نام
            </label>
            <label className="mb-6 h-10 leading-10">نام خانوادگی</label>
            <label className="mb-6 h-10 leading-10">نوع حساب کاربری</label>
            <label className="mb-6 h-10 leading-10">کد ملی</label>
            <label className="mb-6 h-10 leading-10">تاریخ تولد</label>
            <label className="mb-6 h-10 leading-10">محل اقامت</label>
            <label className="mb-6 h-10 leading-10">آدرس</label>
          </div>
          <div className=" flex flex-col w-1/2 text-center md:text-right">
            <SDTextInput
              className="mb-6"
              id="firstName"
              required
              {...register("firstName", { required: "فیلد اجباری است." })}
            />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
          </div>
        </div>
        <div className="flex  w-full md:w-1/2 justify-end">
          <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto  md:min-w-max">
            <label className="mb-6 h-10 leading-10">کد کابر</label>
            <label className="mb-6 h-10 leading-10">نام کاربری</label>
            <label className="mb-6 h-10 leading-10">رمز عبور</label>
            <label className="mb-6 h-10 leading-10">ایمیل</label>
            <label className="mb-6 h-10 leading-10">شماره موبایل</label>
            <label className="mb-6 h-10 leading-10">قد</label>
            <label className="mb-6 h-10 leading-10">وزن</label>
          </div>
          <div className=" flex flex-col w-1/2 text-center md:text-right">
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
            <SDTextInput className="mb-6" />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h6 className="font-bold text-lg">اطلاعات تماس اضطراری</h6>
        <div className="pt-5 flex flex-wrap justify-between">
          <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
            <label className="font-semibold ml-12 h-10 leading-10  w-2">نام</label>
            <SDTextInput className="md:max-w-[250px]" />
          </div>
          <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
            <label className="font-semibold ml-12 h-10 leading-10  w-2">مبایل</label>
            <SDTextInput className="md:max-w-[250px]" />
          </div>
        </div>
      </div>
      <div className="my-3 flex">
        <SDButton className="mr-auto">ذخیره</SDButton>
      </div>
    </form>
  );
};

export default UserForm;
