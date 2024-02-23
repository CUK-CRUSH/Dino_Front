import setting from "@assets/Header/setting.svg";
import { Img } from "react-image";
import { useNavigate } from "react-router-dom";
interface OpenOptionProps {
  id: string;
}
const OpenOption: React.FC<OpenOptionProps> = ({ id }) => {
  const navigate = useNavigate();
  const handleNavigateEnv = () => {
    navigate(`/env`);
    sessionStorage.setItem('id',id);
  };

  return (
    <div className={"w-[22px] h-[40px] right-[20px] top-[20px] absolute"}>
      <button
        className=" text-white text-3xl font-bold tracking-wider "
        onClick={handleNavigateEnv}
      >
        <Img src={setting} alt="setting" />
      </button>
    </div>
  );
};

export default OpenOption;
