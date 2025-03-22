import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import RegisterPage from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import { ToastContainer } from "react-toastify";
import Layout from "./pages/Layout/Layout";
import { FilterProvider } from "./context/filterContext";
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <FilterProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/home"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
        </Routes>
        <ToastContainer />
      </Router>
    </FilterProvider>
  );
};

export default App;
