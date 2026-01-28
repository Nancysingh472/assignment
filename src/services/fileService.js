import api from "../api/api";

export const uploadFile = (formData) => {
  return api.post("/saveDocumentEntry", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const searchDocuments = (payload) => {
  return api.post("/searchDocumentEntry", payload);
};


export const fetchTags = (term = "") => {
  return api.post("/documentTags", {
    term: term,
  });
};
