import { useEffect, useState } from "react";
import { fetchTags, uploadFile } from "../services/fileService";

export default function Upload() {
  const [documentDate, setDocumentDate] = useState("");
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [minorOptions, setMinorOptions] = useState([]);

  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const personalNames = ["John", "Tom", "Emily"];
  const departments = ["Accounts", "HR", "IT", "Finance"];

  
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};

  
  const handleMajorChange = (value) => {
    setMajorHead(value);
    setMinorHead("");

    if (value === "Personal") setMinorOptions(personalNames);
    else if (value === "Professional") setMinorOptions(departments);
    else setMinorOptions([]);
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || !tagInput.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetchTags(tagInput);
        setSuggestions(res.data?.data || []);
      } catch (err) {
        console.error(err.response?.status, err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [tagInput]);

  
  const addTag = (value) => {
    if (!tags.find((t) => t.tag_name === value)) {
      setTags((prev) => [...prev, { tag_name: value }]);
    }
    setTagInput("");
    setSuggestions([]);
  };

  
  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(selectedFile.type)) {
      alert("Only PDF and Image files are allowed");
      return;
    }

    setFile(selectedFile);
  };

  
  const handleSubmit = async () => {
    if (!file || !majorHead || !minorHead || !documentDate) {
      alert("Please fill all required fields");
      return;
    }

    const payload = {
      major_head: majorHead,
      minor_head: minorHead,
      document_date: formatDate(documentDate),
      document_remarks: remarks,
      tags: tags,
      user_id: "nitin",
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify(payload));
    
    try {
      const res = await uploadFile(formData);
      console.log("UPLOAD SUCCESS 👉", res.data);

      alert("File uploaded successfully");
      setDocumentDate("");
      setMajorHead("");
      setMinorHead("");
      setMinorOptions([]);
      setRemarks("");
      setFile(null);
      setTags([]);
      setTagInput("");
      setSuggestions([]);
    } catch (err) {
      console.error(err.response?.status, err.response?.data);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-4 position-relative">
      <h4 className="mb-3">Upload Document</h4>

      
      <input
        type="date"
        className="form-control mb-3"
        value={documentDate}
        onChange={(e) => setDocumentDate(e.target.value)}
      />

      
      <select
        className="form-select mb-3"
        value={majorHead}
        onChange={(e) => handleMajorChange(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Personal">Personal</option>
        <option value="Professional">Professional</option>
      </select>

      
      <select
        className="form-select mb-3"
        value={minorHead}
        onChange={(e) => setMinorHead(e.target.value)}
        disabled={!minorOptions.length}
      >
        <option value="">
          Select {majorHead === "Personal" ? "Name" : "Department"}
        </option>
        {minorOptions.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      
      <label className="form-label fw-semibold">Tags</label>
      <div className="border rounded p-2 mb-2 position-relative">
        <div className="d-flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span key={i} className="badge bg-primary">
              {t.tag_name}
              <span
                className="ms-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeTag(i)}
              >
                ×
              </span>
            </span>
          ))}

          <input
            className="border-0 flex-grow-1"
            placeholder="Type tag & press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
          />
        </div>

        
        {suggestions.length > 0 && (
          <ul className="list-group position-absolute w-50 shadow" style={{ zIndex: 1000 }}>
            {suggestions.map((s, i) => (
              <li
                key={i}
                className="list-group-item list-group-item-action"
                onClick={() => addTag(s.label)}
              >
                {s.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      
      <textarea
        className="form-control mb-3 mt-3"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      
      <input
        type="file"
        className="form-control mb-3"
        accept=".pdf,image/*"
        onChange={handleFileChange}
      />

      <button className="btn btn-success" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
}
