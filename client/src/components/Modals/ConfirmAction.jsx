import { useEffect, useRef } from "react";
import "../../styles/confirmAction.css";
import { enableScroll, disableScroll } from "../../functions/modifyScroll";
const ConfirmAction = ({ setDisplayConfirmAction, confirmAction, content }) => {
  const ref = useRef();
  useEffect(() => {
    disableScroll();
    return () => {
      enableScroll();
    };
  }, [setDisplayConfirmAction]);
  return (
    <div className="confirm-action-container">
      <div className="content" ref={ref}>
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
