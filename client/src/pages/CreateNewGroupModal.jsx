import { useState } from "react";
import Navbar from "../components/Layout/Navbar";
import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";

const CreateNewGroupModal = () => {
  const [group, setGroup] = useState({
    name: "",
    description: "",
    banner: "",
    picture: "",
    type: "PUBLIC",
  });

  const onChange = async (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="create-new-group-modal">
      <form className="create-new-group-form" onSubmit={handleSubmit}>
        <label>Group name</label>
        <br />
        <input
          type="text"
          label="Group name"
          name="name"
          placeholder="Group name"
          value={group.name}
          onChange={onChange}
        />
        <br />
        <label>Select privacy</label>
        <br />
        <select name="privacy" id="">
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <br />
        <button>Create Group</button>
      </form>
    </div>
  );
};

export default CreateNewGroupModal;
