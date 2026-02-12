import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogData({
      ...logData,
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
      const data = JSON.parse(localStorage.getItem("blog_rdata"));
      if (
        data &&
        data.email === logData.email &&
        data.password === logData.password
      ) {
        localStorage.setItem("blog_ldata", JSON.stringify(logData));
        toast.success("Done");
        navigate("/dashboard");
      } else {
        toast.error("Somthing Went Wrong");
      }
    }
  };

  const validate = () => {
    const newError = {};

    if (!logData.email.trim()) {
      newError.email = "Email is Required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(logData.email)) {
      newError.email = "Invalide Email formate.";
    }
    if (!logData.password.trim()) {
      newError.password = "Password is Required.";
    } else if (logData.password.length < 6) {
      newError.password = "Minimum 6 Character Required.";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  return (
    <div className="register">
       <div className="register-card">
         <h1 className="register-title">Create Account</h1>
         <p className="register-subtitle">Join Us And Start Our Journey</p>
   
         <form className="register-form" onSubmit={handleSubmit}>
   
           
   
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
   
           
   
           <button type="submit" className="register-btn">
             Login
           </button>
         </form>
   
         <p className="register-footer">
           Don't have an Account? <Link to="/register">Register</Link>
         </p>
       </div>
     </div>
  );
}

export default Login;