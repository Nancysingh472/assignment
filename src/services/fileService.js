import api from "../api/api";

// Upload API
export const uploadFile = (formData) => {
  return api.post("/saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// Search API
export const searchDocuments = (payload) => {
  return api.post("/searchDocumentEntry", payload);
};

// Document Tags API
export const fetchTags = (term = "") => {
  return api.post("/documentTags", {
    term: term,
  });
};
