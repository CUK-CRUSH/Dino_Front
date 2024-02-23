import { AiFillPlusCircle, AiOutlinePicture } from "react-icons/ai";
import { BsFillExclamationCircleFill } from "react-icons/bs";

type IconType = React.ElementType;

const icons: Record<string, IconType> = {
  musicPlus: AiFillPlusCircle,
  representiveImg: AiOutlinePicture,
  exclamationCircle : BsFillExclamationCircleFill,
};

export default icons;
