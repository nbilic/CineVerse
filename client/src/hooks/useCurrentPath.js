import { useState } from "react";
import { useEffect } from "react";
import { matchRoutes, useLocation } from "react-router-dom";

const routes = [{ path: "/" }];

export default function useCurrentPath() {
  const location = useLocation();
  let currentPath;
  useEffect(() => {
    let currentPath = location.pathname;
    return currentPath;
  }, [location]);
  return currentPath;
}
