import React, { useState } from "react";
import { searchDocuments } from "../services/fileService";

const Search = () => {
  const [majorHead, setMajorHead] = useState("");
  const [minorHead, setMinorHead] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState([]);
  const [results, setResults] = useState([]);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      const value = tagInput.trim();
      if (value) {
        setTags([...tags, value]);
        setTagInput("");
      }
    }
  };

  const handleSearch = async () => {
    const payload = {
      major_head: majorHead,
      minor_head: minorHead,
      from_date: fromDate,
      to_date: toDate,
      tags: tags.map((t) => ({ tag_name: t })), // EXACT format
      uploaded_by: "",
      start: 0,
      length: 10,
      filterId: "",
      search: {
        value: "",
      },
    };

    try {
      const res = await searchDocuments(payload);
      setResults(res.data.data || []);
    } catch (err) {
      console.error(err);
      alert("Search failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Search Document</h3>

      <input
        className="form-control mb-2"
        placeholder="Major Head"
        value={majorHead}
        onChange={(e) => setMajorHead(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Minor Head"
        value={minorHead}
        onChange={(e) => setMinorHead(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-2"
        placeholder="From Date (dd-mm-yyyy)"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-2"
        placeholder="To Date (dd-mm-yyyy)"
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Type tag and press Enter"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleAddTag}
      />

      <button className="btn btn-primary mb-3" onClick={handleSearch}>
        Search
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Major</th>
            <th>Minor</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.major_head}</td>
              <td>{item.minor_head}</td>
              <td>{item.document_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
