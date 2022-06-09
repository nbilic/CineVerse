import { useNavigate } from "react-router-dom";

/* function NavigateTo(handle) {
  
  console.log("called");
 
}

export default NavigateTo;
 */
const NavigateTo = (handle) => {
  const navigate = useNavigate();
  return navigate(`/profile/${handle}`);
};

export default NavigateTo;
