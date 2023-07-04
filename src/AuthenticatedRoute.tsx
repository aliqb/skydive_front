import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { AuthData } from "./models/auth.models";
import { authActions } from "./store/auth";
import useAPi from "./hooks/useApi";
import { BaseResponse, UserGeneralInfo } from "./models/shared.models";
interface AutenticateGuardProps {
  component: React.ComponentType;
}
const AuthenticatedRoute: React.FC<AutenticateGuardProps> = (props) => {
  const navigate = useNavigate();
  const headerSet = useAppSelector((state) => state.auth.httpHeaderSet);
  const dispatch = useAppDispatch();
  const {sendRequest} = useAPi<null,BaseResponse<UserGeneralInfo>>();


  useEffect(() => {
    if (!headerSet) {
      const authDataJson = localStorage.getItem("authData");
      if (authDataJson) {
        const authData: AuthData = JSON.parse(authDataJson);
        dispatch(authActions.setToken(authData));
      } else {
        navigate("/auth");
      }
      return;
    }
    sendRequest({
      url:'/Users/GetUserInformation'
    },(response)=>{
      dispatch(authActions.setUserGenralInfo(response.content))
    })
  }, [headerSet,sendRequest,dispatch,navigate]);

  return <>{headerSet && <props.component></props.component>}</>;
};

export default AuthenticatedRoute;
