import React, { useState } from "react";
import { generateOTP } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      await generateOTP(mobile);
      alert("OTP sent successfully");
      navigate("/otp", { state: { mobile } });
    } catch (err) {
      alert("Failed to send OTP");
      console.log(err);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>

      <input
        className="form-control mb-3"
        placeholder="Enter Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />

      <button className="btn btn-primary" onClick={handleSendOtp}>
        Send OTP
      </button>
    </div>
  );
};

export default Login;
