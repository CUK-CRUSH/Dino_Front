import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
interface OptionHeaderProps {
  text?: string;
}

const OptionHeader: React.FC<OptionHeaderProps> = ({ text }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  }

  return (
    <header className="relative h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] m-3 text-[19px] ">
      <button
        type="button"
        onClick={handleBack}
        className="text-white self-start mt-2"
      >
        <FaAngleLeft size={24} color="black" />
      </button>
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-PretendardMedium">

        <span className="">
          {text}
        </span>
      </div>
    </header>
  );
};

export default OptionHeader;
