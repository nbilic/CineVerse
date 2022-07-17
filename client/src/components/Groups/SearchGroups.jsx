import { useState } from "react";
import api from "../../api/api";
import "../../styles/searchUsers.css";
import { useNavigate } from "react-router-dom";
const SearchGroups = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?group=${input}`);
    }
  };

  return (
    <div className="search-users-div">
      <h5>Search groups</h5>
      <input
        type="text"
        className="user-search"
        placeholder="Batman fanclub"
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchGroups;
