
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Auth/pages/Login";
import AuthContainer from "./pages/Auth/AuthContainer";

function App() {
  return (
    <Router>
      <Routes>
        <Route Component={AuthContainer} path="auth">
          <Route Component={Login} path=""></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
