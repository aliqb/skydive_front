import "./App.css";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Outlet,
} from "react-router-dom";
import UsernameLoginPage from "./pages/Auth/pages/UsernameLoginPage";
import AuthContainer from "./pages/Auth/AuthContainer";
import PasswordLoginPage from "./pages/Auth/pages/PasswordLoginPage";
import OTPLOginPage from "./pages/Auth/pages/OTPLoginPage";
import ForgetPasswordFirstPage from "./pages/Auth/pages/forgetPassword/ForgetPasswordFirstPage";
import ForgetPasswordOtpPage from "./pages/Auth/pages/forgetPassword/ForgetPasswordOtpPage";
import ChangePasswordPage from "./pages/Auth/pages/forgetPassword/ChangePasswordPage";
import SignUpMobilePage from "./pages/Auth/pages/singUp/SingUpMobilePage";
import SingUpPersonaPage from "./pages/Auth/pages/singUp/SingnUpPersonalPage";
import SingUpUserInfoPage from "./pages/Auth/pages/singUp/SignUpUserInfoPage";
import UserPanelContainer from "./pages/userPanel/UserPanelContainer";
import Home from "./pages/userPanel/pages/Home";
import Account from "./pages/userPanel/pages/Account";
import AdminPanelContainer from "./pages/adminPanel/AdminPanelContainer";
import Cartable from "./pages/adminPanel/pages/Cartable";
import SignUpPasswordOtpPage from "./pages/Auth/pages/singUp/SignUpOtpPage";


function App() {
  // useEffect(()=>{
  //   const authDataJson = localStorage.getItem('authData');
  //   if(authDataJson){
  //     const authData : AuthData = JSON.parse(authDataJson);
  //     dispatch(authActions.setToken(authData))
  //   }
  // },[dispatch])
  return (
    <Router>
      <Routes>
        <Route Component={UserPanelContainer} path="">
          <Route Component={Home} path=""></Route>
          <Route Component={Account} path="account"></Route>
        </Route>
        <Route Component={AuthContainer} path="auth">
          <Route Component={UsernameLoginPage} path=""></Route>
          <Route Component={PasswordLoginPage} path="password"></Route>
          <Route Component={OTPLOginPage} path="otp"></Route>
          <Route Component={() => <Outlet></Outlet>} path="forget-password">
            <Route Component={ForgetPasswordFirstPage} path=""></Route>
            <Route Component={ForgetPasswordOtpPage} path="otp"></Route>
            <Route Component={ChangePasswordPage} path="change"></Route>
          </Route>
          <Route Component={() => <Outlet></Outlet>} path="signup">
            <Route Component={SignUpMobilePage} path=""></Route>
            <Route Component={SignUpPasswordOtpPage} path="otp"></Route>
            <Route Component={SingUpPersonaPage} path="personal"></Route>
            <Route Component={SingUpUserInfoPage} path="user-info"></Route>
          </Route>
        </Route>
        <Route Component={AdminPanelContainer} path="admin">
          <Route Component={Cartable} path=""></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
