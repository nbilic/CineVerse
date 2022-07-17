import { AiOutlinePlusCircle } from "react-icons/ai";

const CreateNewGroupButton = ({ toggleCreate }) => {
  return (
    <div className="create-new-group-button">
      <h4>Create new group</h4>
      <AiOutlinePlusCircle
        className="create-group-icon"
        onClick={toggleCreate}
      />
    </div>
  );
};

export default CreateNewGroupButton;
