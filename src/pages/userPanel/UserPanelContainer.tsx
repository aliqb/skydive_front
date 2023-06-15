import { Outlet, useNavigate } from "react-router-dom";
import UserHeader from "../../components/userPanel/UserHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useEffect } from "react";
import { AuthData } from "../../models/auth";
import { authActions } from "../../store/auth";
import useAPi from "../../hooks/useApi";
import { BaseResponse, UserGeneralInfo } from "../../models/shared";

const UserPanelContainer: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();
  const {sendRequest} = useAPi<null,BaseResponse<UserGeneralInfo>>();
  // useEffect(()=>{
  //   console.log('auth',isAuthenticated)
  //   if(!isAuthenticated){
  //     navigate('/auth')
  //   }
  // },[isAuthenticated,navigate])
  useEffect(() => {
    console.log('in eff',isAuthenticated)
    if (!isAuthenticated) {
      const authDataJson = localStorage.getItem("authData");
      if (authDataJson) {
        const authData: AuthData = JSON.parse(authDataJson);
        dispatch(authActions.setToken(authData));
      }else{
        navigate('/auth')
      }
      return
    }
    sendRequest({
      url:'/Users/GetUserInformation'
    },(response)=>{
      dispatch(authActions.setUserGenralInfo(response.content))
    })
  }, [isAuthenticated, navigate,dispatch,sendRequest]);
  return (
    <>
      <UserHeader></UserHeader>
      <Outlet></Outlet>
    </>
    //     <PanelShell header={UserHeader} sidebar={UserSideber} mainContinerClassName="bg-slate-100 p-2  xs:p-6" sidBarContainerClassName="bg-white">
    //         <Outlet></Outlet>
    //     </PanelShell>
  );
};

export default UserPanelContainer;
