import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

interface OptionHeaderProps {
  text?: string;
  // 검색컴포넌트에서 모달 켜고닫기.
  openSearchRecently?: boolean;
  setOpenSearchRecently?: any;
}

const OptionHeader: React.FC<OptionHeaderProps> = ({
  text,
  openSearchRecently,
  setOpenSearchRecently,
}) => {
  const navigate = useNavigate();
  const { username } = useSelector((state: RootState) => state.userProfile);

  const handleBack = () => {
    if (openSearchRecently) {
      setOpenSearchRecently(false);
      return;
    }

    if (username) {
      navigate(`/user/${username}`);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="relative h-[4%] m-3 text-[19px] ">
      <button
        type="button"
        onClick={handleBack}
        className="text-white self-start mt-2"
      >
        <FaAngleLeft size={24} color="black" />
      </button>
      <div className="absolute top-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-PretendardMedium">
        <span className="">{text}</span>
      </div>
    </header>
  );
};

export default OptionHeader;
