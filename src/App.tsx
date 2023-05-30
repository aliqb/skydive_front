
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import LoginPage from "./pages/Auth/pages/LoginPage";
import AuthContainer from "./pages/Auth/AuthContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={AuthContainer} path="auth">
          <Route Component={LoginPage} path=""></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
