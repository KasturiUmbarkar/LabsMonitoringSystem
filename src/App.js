import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthContext } from "./commonComponents/AuthContext";
import { getStoredData, storeData } from "./commonComponents/CommonFunctions";
import "./App.css";

function App() {
  const [user, setUser] = useState(getStoredData("userLoggedIn") || {});
  const [isLoggedIn, setIsLoggedIn] = useState(
    getStoredData("isUserLoggedIn") || false
  );

  const setUserDetails = (userDetails, users) => {
    const usersStored = getStoredData("users");
    setUser(userDetails);
    setIsLoggedIn(!!Object.entries(userDetails).length);
    const data = {
      isUserLoggedIn: !!Object.entries(userDetails).length,
      userLoggedIn: userDetails,
      users: users ? users : usersStored,
    };
    storeData(data);
  };

  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setUserDetails,
        user,
      }}
    >
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login />}
          />
          <Route
            exact
            path="/login"
            element={<Login />}
          />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={isLoggedIn ? <Dashboard /> : <Login />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
