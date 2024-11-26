import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import DomainList from "./components/Domain";
import StudentList from "./components/StudentList";
import PrivateRoute from "./PrivateRoute";
import { UserProvider } from "./UserContext";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/domain"
            element={
              <PrivateRoute>
                <DomainList />
              </PrivateRoute>
            }
          />
          <Route path="/courses/:courseId/students" element={<StudentList />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
