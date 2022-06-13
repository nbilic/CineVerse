import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useRouteToProfile(link) {
  const [navLink] = useState(link);
  const navigate = useNavigate();
  return function routeToProfile() {
    navigate(`/profile/${navLink}`);
  };
}
