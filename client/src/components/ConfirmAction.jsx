import "../styles/confirmAction.css";

const ConfirmAction = ({
  setDisplayConfirmAction,
  deleteReply: confirmAction,
}) => {
  return (
    <div className="confirm-action-container">
      <div className="content">
        <div className="confirm-title">
          <p>Are you sure you want to delete this reply?</p>
        </div>
        <div className="actions">
          <button onClick={confirmAction}>Yes</button>
          <button onClick={() => setDisplayConfirmAction(false)}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAction;
