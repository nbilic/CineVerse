import { useState } from "react";
import api from "../../api/api";
import "../../styles/searchUsers.css";
import { useNavigate } from "react-router-dom";
const SearchUsers = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?user=${input}`);
    }
  };

  return (
    <div className="search-users-div">
      <h5>Search users</h5>
      <input
        type="text"
        className="user-search"
        placeholder="John Doe..."
        onKeyDown={handleKeyDown}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default SearchUsers;
