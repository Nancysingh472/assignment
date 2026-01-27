import api from "../api/api";

export const generateOTP = (mobile_number) => {
  return api.post("/generateOTP", { mobile_number });
};

export const validateOTP = (mobile_number, otp) => {
  return api.post("/validateOTP", { mobile_number, otp });
};
