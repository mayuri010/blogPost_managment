import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";

function Register() {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    conPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState({});

  const handleChange = (e) => {
    setRegData({
      ...regData,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem("blog_rdata", JSON.stringify(regData));
      toast.success("done");
      navigate("/login");
    } else {
      toast.error("somthing went wrong");
    }
  };

  const validate = () => {
    const newError = {};
    if (!regData.name.trim()) {
      newError.name = "Full name is Required.";
    } else if (regData.name.length <= 3) {
      newError.name = "Minimum 3 Character Required.";
    }
    if (!regData.email.trim()) {
      newError.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regData.email)) {
      newError.email = "Invalide Email formate.";
    }
    if (!regData.password.trim()) {
      newError.password = "Password is Required.";
    } else if (regData.password.length < 6) {
      newError.password = "Minimum 6 Character Required.";
    }
    if (!regData.conPassword.trim()) {
      newError.conPassword = "Confirm Password is Required.";
    } else if (regData.conPassword.length < 6) {
      newError.conPassword = "Minimum 6 Character Required.";
    } else if (regData.password !== regData.conPassword) {
      newError.conPassword = "Password and Confirm Password are not same!!.";
    }
    if (!regData.phone.trim()) {
      newError.phone = "Phone is Required.";
    } else if (!/^[0-9]{10}$/.test(regData.phone)) {
      newError.phone = "Phone must be in 10 digit.";
    }
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  return  (
  <div className="register">
    <div className="register-card">
      <h1 className="register-title">Create Account</h1>
      <p className="register-subtitle">Join Us And Start Our Journey</p>

      <form className="register-form" onSubmit={handleSubmit}>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-input"
            placeholder="Enter Your Full Name"
            onChange={handleChange}
          />
          {error.name && <span className="form-error">{error.name}</span>}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Enter Your Email Address"
            onChange={handleChange}
          />
          {error.email && <span className="form-error">{error.email}</span>}
        </div>

        {/* Phone */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            className="form-input"
            placeholder="Enter Your Phone Number"
            onChange={handleChange}
          />
          {error.phone && <span className="form-error">{error.phone}</span>}
        </div>

        {/* Password */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="form-input password-input"
              placeholder="******"
              onChange={handleChange}
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error.password && (
            <span className="form-error">{error.password}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="form-group">
          <label htmlFor="conPassword" className="form-label">
            Confirm Password
          </label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="conPassword"
              id="conPassword"
              className="form-input password-input"
              placeholder="******"
              onChange={handleChange}
            />

            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {error.conPassword && (
            <span className="form-error">{error.conPassword}</span>
          )}
        </div>

        <button type="submit" className="register-btn">
          Register
        </button>
      </form>

      <p className="register-footer">
        Already have an Account? <Link to="/login">Login</Link>
      </p>
    </div>
  </div>
);

}

export default Register;