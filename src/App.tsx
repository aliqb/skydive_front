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
import UserManagement from "./pages/adminPanel/pages/UserManagement";
import Events from "./pages/adminPanel/pages/Events";
import Settings from "./pages/adminPanel/pages/Settings";
import SendMessage from "./pages/adminPanel/pages/SendMessage";
import Reports from "./pages/adminPanel/pages/Reports";

function App() {
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
          <Route Component={() => <Outlet></Outlet>} path="singup">
            <Route Component={SignUpMobilePage} path=""></Route>
            <Route Component={SingUpPersonaPage} path="personal"></Route>
            <Route Component={SingUpUserInfoPage} path="user-info"></Route>
          </Route>
        </Route>
        <Route Component={AdminPanelContainer} path="admin">
          <Route Component={Cartable} path="cartable"></Route>
          <Route Component={UserManagement} path="users"></Route>
          <Route Component={Events} path="events"></Route>
          <Route Component={Settings} path="settings"></Route>
          <Route Component={SendMessage} path="sendMessage"></Route>
          <Route Component={Reports} path="reports"></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
