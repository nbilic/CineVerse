import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useCurrentPath() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState();
  useEffect(() => {
    setCurrentPath(location.pathname);
    return currentPath;
  }, [location]);
  return currentPath;
}
