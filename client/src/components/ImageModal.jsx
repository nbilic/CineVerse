import "../styles/imageModal.css";
import { useEffect, useRef, useState } from "react";

const ImageModal = ({ display, setDisplay, img }) => {
  const ref = useRef();
  useEffect(() => {
    if (display) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    const checkIfClickedOutside = (e) => {
      if (display && ref.current && !ref.current.contains(e.target)) {
        document.body.style.overflow = "scroll";
        setDisplay(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [display]);
  return (
    <div className="image-modal">
      <img src={img} className="img-image-modal" alt="" ref={ref} />
    </div>
  );
};

export default ImageModal;
