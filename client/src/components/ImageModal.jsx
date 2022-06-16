import "../styles/imageModal.css";
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { disableScroll, enableScroll } from "../functions/modifyScroll";
const ImageModal = ({ display, setDisplay, img }) => {
  const ref = useRef();
  useEffect(() => {
    if (display) disableScroll();
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target))
        setDisplay(false);
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      enableScroll();
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display, setDisplay]);
  return (
    <div className="image-modal">
      <AiOutlineClose
        className="close-image-modal"
        onClick={() => setDisplay(false)}
      />
      <img src={img} className="img-image-modal" alt="" ref={ref} />
    </div>
  );
};

export default ImageModal;
