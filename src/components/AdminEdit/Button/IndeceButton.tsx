import { Link } from "react-router-dom";
import {useTranslation} from "react-i18next";


const InduceButton = () => {
  const {t} = useTranslation("IndeceButton");
  return (
    <Link to='/'>

    <div
    className={`z-10 fixed left-1/2 transform -translate-x-1/2 bottom-0 p-4 px-10 text-[#000] bg-[#fff] rounded-2xl h-[40px] flex items-center`}
  >
    <div className="text-center text-sm font-normal font-PretendardSemiBold">
      {t("makemylist")}
    </div>

  </div>
  </Link>
  );
}

export default InduceButton;
