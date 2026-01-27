import React, { useState } from "react";
import { uploadFile } from "../services/fileService";

const Upload = () => {
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      const value = tagInput.trim();
      if (value) {
        setTags([...tags, value]);
        setTagInput("");
      }
    }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;

    if (!f.type.includes("pdf") && !f.type.includes("image")) {
      alert("Only PDF and Image allowed");
      return;
    }

    setFile(f);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please select file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const data = {
      major_head: majorHead,
      minor_head: minorHead,
      document_date: documentDate, // backend accepts string
      document_remarks: remarks,
      tags: tags.map((t) => ({ tag_name: t })), // EXACT format
      user_id: "nitin",
    };

    formData.append("data", JSON.stringify(data));

    try {
      await uploadFile(formData);
      alert("File uploaded successfully");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Upload Document</h3>

      <input
        className="form-control mb-2"
        placeholder="Major Head (Company / Personal / Professional)"
        value={majorHead}
        onChange={(e) => setMajorHead(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Minor Head (Work Order / HR / IT etc)"
        value={minorHead}
        onChange={(e) => setMinorHead(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Document Date (dd-mm-yyyy)"
        value={documentDate}
        onChange={(e) => setDocumentDate(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Type tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
      />

      <div className="mb-2">
        {tags.map((t, i) => (
          <span key={i} className="badge bg-primary me-2">
            {t}
          </span>
        ))}
      </div>

      <input type="file" className="form-control mb-3" onChange={handleFileChange} />

      <button className="btn btn-success" onClick={handleSubmit}>
        Upload
      </button>
    </div>
  );
};

export default Upload;
