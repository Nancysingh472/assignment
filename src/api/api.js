import axios from "axios";

// 🔹 Axios instance
const api = axios.create({
  baseURL: "https://apis.allsoft.co/api/documentManagement",
});

// 🔹 Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Backend expects token header
      config.headers["token"] = token; 
      // agar backend "Authorization" me expect kar raha ho to:
      // config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Fetch tags API
export const fetchTags = (searchText) => {
  return api.post("/documentTags", { tag: searchText });
};

// 🔹 Upload file API
export const uploadFile = (formData) => {
  return api.post("/saveDocumentEntry", formData);
};

export default api;
