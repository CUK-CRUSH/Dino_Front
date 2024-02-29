import setting from "@assets/Header/setting.svg";
import { Img } from "react-image";
import { useNavigate } from "react-router-dom";

const OpenOption: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigateEnv = () => {
    navigate(`/env`);
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
