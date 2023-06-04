
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import UsernameLoginPage from "./pages/Auth/pages/UsernameLoginPage";
import AuthContainer from "./pages/Auth/AuthContainer";
import PasswordLoginPage from "./pages/Auth/pages/PasswordLoginPage";
import OTPLOginPage from "./pages/Auth/pages/OTPLoginPage"
import ForgetPasswordFirstPage from "./pages/Auth/pages/forgetPassword/ForgetPasswordFirstPage";
import ForgetPasswordOtpPage from "./pages/Auth/pages/forgetPassword/ForgetPasswordOtpPage";
import ChangePasswordPage from "./pages/Auth/pages/forgetPassword/ChangePasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={AuthContainer} path="auth">
          <Route Component={UsernameLoginPage} path=""></Route>
          <Route Component={PasswordLoginPage} path="password"></Route>
          <Route Component={OTPLOginPage} path="otp"></Route>
          <Route Component={ForgetPasswordFirstPage} path="forget-password"></Route>
          <Route Component={ForgetPasswordOtpPage} path="forget-password/otp"></Route>
          <Route Component={ChangePasswordPage} path="forget-password/change"></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
