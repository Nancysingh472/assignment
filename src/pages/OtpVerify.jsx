import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { validateOTP } from "../services/authService";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const mobile = state?.mobile;

  const handleVerify = async () => {
    try {
      const res = await validateOTP(mobile, otp);
      const token = res.data.token;

      localStorage.setItem("token", token);
      alert("Login successful");

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Verify OTP</h3>

      <input
        className="form-control mb-3"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className="btn btn-success" onClick={handleVerify}>
        Verify
      </button>
    </div>
  );
};

export default OtpVerify;
