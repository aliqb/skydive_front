import { useForm } from "react-hook-form";
import {
  UserRequest,
  userType,
} from "../../../models/usermanagement.models";
import SDButton from "../../shared/Button";
import UserFormInput from "./UserFormInput";
import { useEffect, useState } from "react";
import useAPi from "../../../hooks/useApi";
import { BaseResponse } from "../../../models/shared.models";
import { City, CityDto } from "../../../models/account.models";
import UserFormSelect from "./UserFormSelect";

interface UserFormProps {
  userDetail?: UserRequest;
  onSubmit: (data: UserRequest, afterSubmit: () => void) => void;
}

const UserForm: React.FC<UserFormProps> = (props) => {
  const {
    register,
    formState: { errors: formErrors },
    handleSubmit,
    control,
  } = useForm<UserRequest>({
    mode: "onTouched",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { sendRequest: sendCitiesRequest } = useAPi<
    null,
    BaseResponse<CityDto[]>
  >();

  const { sendRequest: sendUserTypesRequest, data: userTypes } = useAPi<
    null,
    BaseResponse<userType[]>
  >();

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    function getCities() {
      sendCitiesRequest(
        {
          url: "/cities",
          params: {
            pageSize: 10000,
            pageIndex: 1,
          },
        },
        (response) => {
          const cities = response.content
            .map(
              (item) => new City(item.id, item.state, item.province, item.city)
            )
            .sort((c1, c2) =>
              c1.locationString.localeCompare(c2.locationString)
            );
          setCities(cities);
        }
      );
    }

    function getUserTypes() {
      sendUserTypesRequest({
        url: "/UserTypes",
        params: {
          pageSize: 10000,
          pageIndex: 1,
        },
      });
    }

    getCities();
    getUserTypes();
  }, [props.userDetail, sendCitiesRequest, sendUserTypesRequest]);

  function onSubmit(data: UserRequest) {
    setIsSubmitting(true);
    props.onSubmit(data, () => {
      setIsSubmitting(false);
    });
  }

  return (
    <form
      className="  text-slate-800 lg:px-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-wrap justify-between">
        <div className="flex  w-full md:w-1/2 ">
          <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto md:min-w-max">
            <label htmlFor="firstName" className="mb-6 h-12 leading-[3rem]">
              نام
            </label>
            <label htmlFor="lastName" className="mb-6 h-12 leading-[3rem]">
              نام خانوادگی
            </label>
            <label htmlFor="userTypeId" className="mb-6 h-12 leading-[3rem]">
              نوع حساب کاربری
            </label>
            <label htmlFor="nationalCode" className="mb-6 h-12 leading-[3rem]">
              کد ملی
            </label>
            <label htmlFor="birthDate" className="mb-6 h-12 leading-[3rem]">
              تاریخ تولد
            </label>
            <label htmlFor="cityId" className="mb-6 h-12 leading-[3rem]">
              محل اقامت
            </label>
            <label htmlFor="address" className="mb-6 h-12 leading-[3rem]">
              آدرس
            </label>
          </div>
          <div className=" flex flex-col w-1/2 text-center md:text-right">
            <UserFormInput
              register={register}
              name="firstName"
              errors={formErrors}
            />
            <UserFormInput
              register={register}
              name="lastName"
              errors={formErrors}
            />
            <UserFormSelect
              name="userTypeId"
              register={register}
              errors={formErrors}
              options={{required:'فیلد الزامی است.'}}
            >
              <option value=""></option>;
              {userTypes?.content &&
                userTypes.content.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.title}
                    </option>
                  );
                })}
            </UserFormSelect>
            <UserFormInput
              register={register}
              name="nationalCode"
              options={{
                required: "فیلد الزامی است.",
                pattern: {
                  value: /^\d{10}$/,
                  message: "کد ملی باید 10 رقم باشد.",
                },
              }}
              errors={formErrors}
            />
            <UserFormInput
              control={control}
              name="birthDate"
              options={{
                required: "فیلد الزامی است.",
              }}
              errors={formErrors}
              type="date"
              required={true}
            />

            <UserFormSelect
              name="cityId"
              register={register}
              errors={formErrors}
              options={{}}
            >
              <option value=""></option>;
              {cities &&
                cities.map((city, index) => {
                  return (
                    <option key={index} value={city.id}>
                      {city.locationString}
                    </option>
                  );
                })}
            </UserFormSelect>
            <UserFormInput
              register={register}
              name="address"
              errors={formErrors}
              options={{}}
            />
          </div>
        </div>
        <div className="flex  w-full md:w-1/2 justify-end">
          <div className="font-semibold flex flex-col  md:pl-6 ml-6 border-l w-1/2 md:w-auto  md:min-w-max">
            <label htmlFor="userCode" className="mb-6 h-12 leading-[3rem]">
              کد کابر
            </label>
            <label htmlFor="username" className="mb-6 h-12 leading-[3rem]">
              نام کاربری
            </label>
            <label htmlFor="password" className="mb-6 h-12 leading-[3rem]">
              رمز عبور
            </label>
            <label htmlFor="email" className="mb-6 h-12 leading-[3rem]">
              ایمیل
            </label>
            <label htmlFor="phone" className="mb-6 h-12 leading-[3rem]">
              شماره موبایل
            </label>
            <label htmlFor="height" className="mb-6 h-12 leading-[3rem]">
              قد
            </label>
            <label htmlFor="weight" className="mb-6 h-12 leading-[3rem]">
              وزن
            </label>
          </div>
          <div className=" flex flex-col w-1/2 text-center md:text-right">
            <UserFormInput
              name="userCode"
              //   register={register}
              disabled={true}
              errors={formErrors}
            />
            <UserFormInput
              register={register}
              name="username"
              ltr={true}
              options={{
                required: "فیلد الزامی است.",
                pattern: {
                  value: /^[\da-zA-z]*$/,
                  message:
                    "نام کاربری فقط باید شامل اعداد و حروف انگلیسی باشد.",
                },
                minLength: {
                  value: 5,
                  message: "نام کاربری حداقل باید 5 کاراکتر باشد.",
                },
              }}
              errors={formErrors}
            />
            <UserFormInput
              register={register}
              name="password"
              errors={formErrors}
              options={{
                required: "فیلد الزامی است.",
                pattern: {
                  value: /^(?=.*\d)(?=.*[A-Za-z])[\dA-Za-z!@#$%^&*\-()+=]{6,}$/,
                  message:
                    "رمز عبور حداقل 6 کاراکتر و شامل اعداد و حروف انگلیسی باشد.",
                },
              }}
              type="password"
            />
            <UserFormInput
              register={register}
              name="email"
              type="email"
              errors={formErrors}
              ltr={true}
              options={{
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "مقدار وارد شده صحیح نیست.",
                },
              }}
            />
            <UserFormInput
              register={register}
              name="phone"
              errors={formErrors}
              ltr={true}
              options={{
                required:'فیلد اجباری است.',
                pattern: {
                  value: /(\+98|0|0098)9\d{9}$/,
                  message: "شماره موبایل صحیح نیست.",
                },
              }}
            />
            <UserFormInput
              register={register}
              name="height"
              type="number"
              errors={formErrors}
              options={{}}
            />
            <UserFormInput
              register={register}
              name="weight"
              type="number"
              errors={formErrors}
              options={{}}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h6 className="font-bold text-lg">اطلاعات تماس اضطراری</h6>
        <div className="pt-5 flex flex-wrap justify-between">
          <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
            <label className="font-semibold ml-12 h-12 leading-[3rem]  w-2">
              نام
            </label>
            <UserFormInput
              register={register}
              name="emergencyContact"
              errors={formErrors}
              options={{}}
            />
          </div>
          <div className="flex w-full pb-6 md:w-1/2   lg:w-5/12">
            <label className="font-semibold ml-12 h-12 leading-[3rem]  w-2">
              مبایل
            </label>
            <UserFormInput
              register={register}
              name="emergencyPhone"
              errors={formErrors}
              options={{
                pattern: {
                  value: /(\+98|0|0098)9\d{9}$/,
                  message: "شماره موبایل صحیح نیست.",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="my-3 flex">
        <SDButton type="submit" className="mr-auto" disabled={isSubmitting}>
          ذخیره
        </SDButton>
      </div>
    </form>
  );
};

export default UserForm;
