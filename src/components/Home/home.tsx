import { Link } from "react-router-dom";
import mainGraphic from "@assets/main_graphic.svg";
import Mylist from "@assets/Mylist 1.svg";
import { useTranslation } from "react-i18next";
const HomeComponent = () => {
  const { t } = useTranslation("Home");
  // This is the HomeComponent that has been fixed.
  return (
    <div className="w-full h-full scrollbar-hide overflow-scroll">
      <div
        className={"flex mt-5 flex-row-reverse justify-between align-middle"}
      >
        <div className={"grow"}></div>
        <img className={"m-4 w-[110px] h-[40px]"} src={Mylist} alt="Mylist" />
      </div>
      <div className={"h-[38px]"}></div>
      <div className={"flex flex-col items-center justify-center gap-4"}>
        <img
          className=" smartPhoneXs:h-[calc(100vh-300px)] smartPhone:h-[calc(100vh-400px)]"
          src={mainGraphic}
          alt="Main Graphic"
        />
        <div className={"h-[44px]"}></div>
        <Link className={`w-buttonWidth `} to={"/login"}>
          <div className="flex flex-row  h-[58px] bg-neutral-200 rounded-[30px] justify-center items-center">
            <div className="text-[15px] font-normal font-['Pretendard']">
              <b>{t("makemylist")}</b>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeComponent;
