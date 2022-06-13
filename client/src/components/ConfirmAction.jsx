import "../styles/confirmAction.css";

const ConfirmAction = ({ setDisplayConfirmAction, confirmAction, content }) => {
  return (
    <div className="confirm-action-container">
      <div className="content">
        <div className="confirm-title">
          <p>{content}</p>
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
