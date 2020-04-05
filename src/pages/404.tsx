import { navigate } from "gatsby";
import { useEffect } from "react";

export default (): null => {
  useEffect(() => {
    navigate("/");
  }, []);
  return null;
};
