import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../../components/adminPanel/userManagement/UserForm";
import SDCard from "../../../../components/shared/Card";
import useAPi from "../../../../hooks/useApi";
import { BaseResponse } from "../../../../models/shared.models";
import { UserRequest } from "../../../../models/usermanagement.models";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import { useEffect } from "react";
import {
  fetchUserDetail,
  usermanagementActions,
} from "../../../../store/usermanagement";
import SDSpinner from "../../../../components/shared/Spinner";

const EditUserPage: React.FC = () => {
  const { sendRequest } = useAPi<UserRequest, BaseResponse<null>>();
  const navigate = useNavigate();
  const params = useParams();
  const userMamangementState = useAppSelector((state) => state.userManagement);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserDetail(params.userId as string));
    return () => {
      dispatch(usermanagementActions.resetUserDetail());
    };
  }, [params.userId, dispatch]);

  function onSubmit(data: UserRequest, afterSubmit: () => void) {
    sendRequest(
      {
        url: `/Admin/UpdateUser/${params.userId}`,
        method: "put",
        data: {
          ...data,
          cityId: data.cityId || null,
          email: data.email || null,
        },
      },
      (response) => {
        toast.success(response.message);
        afterSubmit();
        navigate("/admin/users");
      },
      (error) => {
        toast.error(error?.message);
        afterSubmit();
      }
    );
  }

  return (
    <SDCard className="pt-0 px-0 pb-2 border border-blue-100">
      <div className="  py-5 px-10 bg-blue-900 text-white rounded-t-lg">
        <h6 className="font-bold text-lg ">ویرایش کاربر</h6>
      </div>
      <div className="px-2 xs:px-4 lg:px-12 mt-12">
        {userMamangementState.loading && (
          <div className="flex justify-center">
            <SDSpinner color="blue" size={28}></SDSpinner>
          </div>
        )}
        {userMamangementState.userDetail && !userMamangementState.loading && <UserForm onSubmit={onSubmit} userDetail={userMamangementState.userDetail} />}
      </div>
    </SDCard>
  );
};

export default EditUserPage;
