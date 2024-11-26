// Login.js
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";
import "../Styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/v1/auth/admin/login",
        loginData
      );
      console.log(response.data);
      setUser(response.data);
      navigate("/domain");
    } catch (err) {
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  //   // Check credentials
  //   if (email === "abc@gmail.com" && password === "1234") {
  //     // Successful login
  //     // Redirect to DomainList component
  //     window.location.href = "/domainlist";
  //   } else {
  //     setErrorMessage("Invalid email or password");
  //   }
  // };

  return (
    <div className="center-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
