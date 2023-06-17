/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useForm } from "react-hook-form";
import SDButton from "../../shared/Button";
import SDLabel from "../../shared/Label";
import SDTextInput from "../../shared/TextInput";
import useAPi from "../../../hooks/useApi";
import { BaseResponse, UserPersonalInfo } from "../../../models/shared.models";
import { useEffect, useState } from "react";
import { City, CityDto } from "../../../models/account.models";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { accoutnActions } from "../../../store/account";

interface PersonalInfoProps{
  onSubmit:()=>void
}
interface PersonalInfoEditableFormData {
  email: string;
  cityId: string;
  address: string;
  height: number;
  weight: number;
  emergencyContact: string;
  emergencyPhone: string;
}
const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<PersonalInfoEditableFormData>({
    mode: "onTouched",
  });

  const { sendRequest: getInfo, data: personalInfo } = useAPi<
    null,
    BaseResponse<UserPersonalInfo>
  >();

  const { sendRequest: sendCitiesRequest } = useAPi<
    null,
    BaseResponse<CityDto[]>
  >();

  
  const dispatch = useAppDispatch();

  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getInfo(
      {
        url: "/Users/GetPersonalInformation",
      },
      (response) => {
        setFormValue(response.content);
        dispatch(accoutnActions.setPersonalInfo(response.content));
      }
    );

    getCities();
  }, []);

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
          .sort((c1, c2) => c1.locationString.localeCompare(c2.locationString));
        setCities(cities);
      }
    );
  }

  function setFormValue(info: UserPersonalInfo) {
    reset({
      address: info.address,
      cityId: info.cityId,
      email: info.email,
      emergencyContact: info.emergencyContact,
      emergencyPhone: info.emergencyPhone,
      height: info.height,
      weight: info.weight,
    });
  }

  function onSubmit(data: PersonalInfoEditableFormData) {
    console.log(data);
    const info : UserPersonalInfo = {
      ...personalInfo!.content,
      ...data
    }
    dispatch(accoutnActions.setPersonalInfo(info))
    props.onSubmit();
  }

  return (
    <div className="flex pt-4">
      <form
        className="flex flex-wrap justify-end max-w-xl mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2">
            <SDLabel htmlFor="nationalCode">کد ملی</SDLabel>
            <SDTextInput
              type="text"
              id="nationalCode"
              disabled={true}
              defaultValue={personalInfo?.content.nationalCode}
            />
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="birthDate">تاریخ تولد</SDLabel>
            <SDTextInput
              disabled={true}
              type="text"
              id="birthDate"
              defaultValue={personalInfo?.content.birthDate}
            />
          </div>
        </div>
        <div className="mb-6 w-full flex gap-3">
          <div className="w-1/3">
            <SDLabel htmlFor="firstName">نام</SDLabel>
            <SDTextInput
              type="text"
              id="firstName"
              disabled={true}
              defaultValue={personalInfo?.content.firstName}
            />
          </div>
          <div className="w-2/3">
            <SDLabel htmlFor="lastName">نام خانوادگی</SDLabel>
            <SDTextInput
              disabled={true}
              type="text"
              id="lastName"
              defaultValue={personalInfo?.content.lastName}
            />
          </div>
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="email">ایمیل</SDLabel>
          <SDTextInput
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "مقدار وارد شده صحیح نیست.",
              },
            })}
            type="email"
            id="email"
            className="ltr"
            invalid={!!errors.email}
          />
          {errors.email?.message && (
            <p className="text-red-600 text-sm pr-2 mt-2">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="mb-6 w-full">
          <SDLabel htmlFor="cityId">استان و شهر اقامت</SDLabel>
          {/* <SDTextInput {...register("cityId")} type="cityId" id="cityId" /> */}
          <select
            id="cityId"
            {...register("cityId")}
            defaultValue=""
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="" ></option>
            {
              cities.map((city,index)=>{
                return (<option key={index} value={city.id}>{city.locationString}</option>)
              })
            }
          </select>
        </div>
        <div className=" w-full mb-6">
          <SDLabel htmlFor="address">نشانی</SDLabel>
          <SDTextInput {...register("address")} type="address" id="address" />
        </div>
        <div className="mb-6 w-full flex gap-6">
          <div className="w-1/2 ">
            <SDLabel htmlFor="firstName">قد (سانتی متر)</SDLabel>
            <SDTextInput
              {...register("height", { valueAsNumber: true })}
              type="number"
              id="firstName"
              className="ltr"
            />
          </div>
          <div className="w-1/2">
            <SDLabel htmlFor="lastName">وزن (کیلوگرم)</SDLabel>
            <SDTextInput
              {...register("weight", { valueAsNumber: true })}
              type="number"
              id="lastName"
              className="ltr"
            />
          </div>
        </div>
        <div className="w-full mt-8">
          <p className="text-slate-700 mb-4">اطلاعات تماس اضطراری</p>
          <div className="mb-6 w-full flex gap-6">
            <div className="w-1/2 ">
              <SDLabel htmlFor="firstName">نام</SDLabel>
              <SDTextInput
                {...register("emergencyContact")}
                type="text"
                id="firstName"
                className="ltr"
              />
            </div>
            <div className="w-1/2">
              <SDLabel htmlFor="lastName">موبایل</SDLabel>
              <SDTextInput
                {...register("emergencyPhone", {
                  pattern: {
                    value: /(\+98|0|0098)9\d{9}$/,
                    message: "شماره موبایل صحیح نیست.",
                  },
                })}
                type="text"
                id="lastName"
                className="ltr"
                invalid={!!errors.emergencyPhone}
              />
              {errors.emergencyPhone?.message && (
                <p className="text-red-600 text-sm pr-2 mt-2">
                  {errors.emergencyPhone.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end md:w-1/2 md:pr-3">
          <SDButton
            className="w-full"
            color="primary"
            type="submit"
            disabled={!isDirty}
          >
            مرحله بعد
          </SDButton>
        </div>
      </form>
    </div>
  );
};
export default PersonalInfo;
