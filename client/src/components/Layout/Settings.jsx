import { useState, useRef, useEffect } from "react";
import "../../styles/settings.css";
import { enableScroll, disableScroll } from "../../functions/modifyScroll";
import { AiOutlineClose } from "react-icons/ai";
const Settings = ({ display, setDisplay }) => {
  const [option, setOption] = useState("EMAIL");
  const ref = useRef();
  useEffect(() => {
    if (display) disableScroll();
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      enableScroll();
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display, setDisplay]);
  return (
    <div className="settings-container">
      <div className="top-layer-settings">
        <AiOutlineClose
          className="close-edit-profile-modal"
          onClick={setDisplay}
        />
        <h3>Settings</h3>
      </div>

      <div className="settings" ref={ref}>
        <ul>
          <li onClick={() => setOption("EMAIL")}>E-Mail</li>
          <li onClick={() => setOption("PASSWORD")}>Password</li>
        </ul>
        <form>
          {option === "EMAIL" ? (
            <>
              <label htmlFor="email">Enter new email</label>
              <input type="email" placeholder="email@email.com" />
            </>
          ) : (
            <>
              <label htmlFor="password">Enter current password</label>
              <input type="password" />
              <label htmlFor="password">Enter new password</label>
              <input type="password" />
              <label htmlFor="password">Confirm new password</label>
              <input type="password" />
            </>
          )}
          <button className="settings-submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
