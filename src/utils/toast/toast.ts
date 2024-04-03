import { toast } from "react-toastify";
import './custom-toast.css';
export const notify = (text: string, color?: "black" | "white") => {
  const style = {
    backgroundColor: color === "black" ? "rgba(0, 0, 0, 0.8)" : "rgba(255, 255, 255,1)",
    color: color === "black" ? "#FFF" : "#000",
   
  };

  toast(text, {
    className : 'custom-toast',
    style: style, 
  });
};
