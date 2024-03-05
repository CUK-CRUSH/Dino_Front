import { Link } from "react-router-dom";
import mainGraphic from "@assets/main_graphic.svg";
import Mylist from "@assets/Mylist 1.svg";
import { useTranslation } from 'react-i18next';
const HomeComponent = () => {

    const { t } = useTranslation("Home");
// This is the HomeComponent that has been fixed.
  return (
      <div className="w-full h-full scrollbar-hide overflow-scroll">
        <div className={"h-[30px]"}></div>
        <div className={"flex flex-row-reverse justify-between align-middle"}>
          <div className="w-[91px] h-[34px] m-4 bg-neutral-700 rounded-[9px] flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none"
                 className={"ml-1"}>
              <g clip-path="url(#clip0_1_10)">
                <path
                    d="M1.91667 11.5C1.91667 16.7929 6.20713 21.0833 11.5 21.0833C16.7929 21.0833 21.0833 16.7929 21.0833 11.5C21.0833 6.20712 16.7929 1.91666 11.5 1.91666C6.20713 1.91666 1.91667 6.20712 1.91667 11.5Z"
                    stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
                <path
                    d="M12.4583 1.96457C12.4583 1.96457 15.3333 5.74999 15.3333 11.5C15.3333 17.25 12.4583 21.0354 12.4583 21.0354M10.5417 21.0354C10.5417 21.0354 7.66667 17.25 7.66667 11.5C7.66667 5.74999 10.5417 1.96457 10.5417 1.96457M2.52042 14.8542H20.4796M2.52042 8.14582H20.4796"
                    stroke="white" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
              <defs>
                <clipPath id="clip0_1_10">
                  <rect width="23" height="23" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <div className={"w-[4px]"}></div>
            <div><p className={"text-amber-50"}>한국어</p></div>
          </div>
          <div className={"grow"}></div>
          <img className={"m-4"} src={Mylist} alt="Mylist"/>
        </div>
        <div className={"h-[38px]"}></div>
        <div className={"divdiv flex flex-col items-center justify-center gap-4"}>
          <img src={mainGraphic} alt="Main Graphic"/>
          <div className={"h-[44px]"}></div>
            <Link to={"/login"}>
          <div className="flex flex-row w-[360px] h-[58px] bg-neutral-200 rounded-[30px] justify-center items-center">
              <div className="text-[15px] font-normal font-['Pretendard']"><b>{t("makemylist")}</b></div>
          </div>
            </Link>

          <div className={"h-[30px]"}></div>


          <div className={"h-[38px]"}></div>
        </div>
      </div>
  );
};

export default HomeComponent;
