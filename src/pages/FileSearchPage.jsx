import { useState, useEffect } from "react";
import { fetchTags, searchDocuments } from "../services/fileService";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function FileSearchPage() {
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [minorOptions, setMinorOptions] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [results, setResults] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);

  const personalNames = ["John", "Tom", "Emily"];
  const departments = ["Accounts", "HR", "IT", "Finance"];

  const token = localStorage.getItem("token");
  
  
  useEffect(() => {
    if (!tagInput.trim() || !token) {
      setTagSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetchTags(tagInput, token);
        setTagSuggestions(res.data?.data || []);
      } catch (err) {
        console.error(err.response?.status, err);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [tagInput, token]);

 
  const handleMajorChange = (value) => {
    setMajorHead(value);
    setMinorHead("");

    if (value === "Personal") setMinorOptions(personalNames);
    else if (value === "Professional") setMinorOptions(departments);
    else setMinorOptions([]);
  };

  
  const addTag = (value) => {
    if (!tags.find(t => t.tag_name === value)) {
      setTags([...tags, { tag_name: value }]);
    }
    setTagInput("");
    setTagSuggestions([]);
  };
  const removeTag = (i) => setTags(tags.filter((_, idx) => idx !== i));
  
  // const formatDate = (dateStr) => {
  //   if (!dateStr) return "";
  //   const [year, month, day] = dateStr.split("-");
  //   return `${day}-${month}-${year}`;
  // };

  
  const handleSearch = async () => {
  const payload = {
    major_head: majorHead,
    minor_head: minorHead,
    from_date: fromDate || "",
    to_date: toDate || "",
    tags,
    uploaded_by: "nitin",
    start: 0,
    length: 10,
    filterId: "",
    search: {
      value: ""
    }
  };

 
  try {
    const res = await searchDocuments(payload, token);
    
    setResults(res.data?.data || []);
  } catch (err) {
    console.error(err.response || err);
  }
};


 
  const downloadFile = (file) => {
    const link = document.createElement("a");
    link.href = file.file_url;
    link.download = file.file_name;
    link.click();
  };

  
 const downloadAllZip = async () => {
  const zip = new JSZip();

  for (let f of results) {
    try {
      const res = await fetch(f.file_url);
      if (!res.ok) continue;

      const blob = await res.blob();
      if (!blob.size) continue;

      zip.file(
        f.file_name || `file-${Date.now()}`,
        blob
      );
    } catch (e) {
      console.error("skip", f.file_url);
    }
  }

  const zipBlob = await zip.generateAsync({ type: "blob" });
  saveAs(zipBlob, "documents.zip");
};

const getFileTypeFromUrl = (url) => {
  if (!url) return "other";
  const ext = url.split('.').pop().split('?')[0].toLowerCase();

  if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "other";
};





  return (
    <div className="container mt-4">
      <h3>File Search</h3>

      
      <div className="mb-3">
        <select value={majorHead} onChange={e => handleMajorChange(e.target.value)} className="form-select mb-2">
          <option value="">Select Category</option>
          <option value="Personal">Personal</option>
          <option value="Professional">Professional</option>
        </select>

        <select value={minorHead} onChange={e => setMinorHead(e.target.value)} className="form-select mb-2" disabled={!minorOptions.length}>
          <option value="">Select {majorHead === "Personal" ? "Name" : "Department"}</option>
          {minorOptions.map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
        </select>

       
        <div className="border rounded p-2 position-relative mb-2">
          <div className="d-flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <span key={i} className="badge bg-primary">
                {t.tag_name} <span className="ms-1" style={{ cursor: "pointer" }} onClick={() => removeTag(i)}>×</span>
              </span>
            ))}
            <input
              type="text"
              className="border-0 flex-grow-1"
              placeholder="Type tag & press Enter"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTag(tagInput)}
            />
          </div>

          {tagSuggestions.length > 0 && (
            <ul className="list-group position-absolute w-50 shadow" style={{ zIndex: 1000 }}>
              {tagSuggestions.map((s, i) => (
                <li key={i} className="list-group-item list-group-item-action" onClick={() => addTag(s.label)}>
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="d-flex gap-2 mb-3">
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className="form-control" />
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className="form-control" />
        </div>

        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        {results.length > 0 && <button className="btn btn-success ms-2" onClick={downloadAllZip}>Download All ZIP</button>}
      </div>

      
      {Array.isArray(results) && results.length > 0 && (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>Document Id</th>
        <th>Major Head</th>
        <th>Minor Head</th>
        <th>Uploaded By</th>
        <th>Date</th>
        <th>Remark</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {results.map(f => (
        <tr key={f.document_id}>
          <td>{f.document_id || '-'}</td>

          <td>{f.major_head || '-'}</td>
          <td>{f.minor_head || '-'}</td>

          <td>{f.uploaded_by}</td>
          <td>{f.document_date}</td>
          <td>
            {f.document_remarks}
          </td>
          <td>
            <button className="btn btn-sm btn-info me-1" onClick={() => setPreviewFile(f)}>
              Preview
            </button>
            <button className="btn btn-sm btn-success" onClick={() => downloadFile(f)}>
              Download
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}


      
     {previewFile && (
  <div className="modal show d-block" onClick={() => setPreviewFile(null)}>
    <div className="modal-dialog modal-lg" onClick={e => e.stopPropagation()}>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{previewFile.file_name}</h5>
          <button className="btn-close" onClick={() => setPreviewFile(null)}></button>
        </div>

        <div className="modal-body" style={{ maxHeight: "80vh", overflow: "auto" }}>
          {(() => {
            const fileType = getFileTypeFromUrl(previewFile.file_url);

            if (fileType === "image") {
              return (
                <img
                  src={previewFile.file_url}
                  alt={previewFile.file_name}
                  style={{ width: "100%", height: "auto" }}
                />
              );
            }

            if (fileType === "pdf") {
              return (
                <object
                  data={previewFile.file_url}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                >
                  <p>
                    PDF preview not supported.
                    <a href={previewFile.file_url} target="_blank" rel="noreferrer">
                      Download
                    </a>
                  </p>
                </object>
              );
            }

            return (
              <div className="text-center">
                <p>Preview not supported for this file type.</p>
                <a
                  href={previewFile.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  Download File
                </a>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}
