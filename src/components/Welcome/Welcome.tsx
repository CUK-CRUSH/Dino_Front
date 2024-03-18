import { Link } from "react-router-dom";
import mainGraphic from "@assets/main_graphic.svg";
import Mylist from "@assets/Mylist 1.svg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
const WelcomeComponent = () => {
  const { t } = useTranslation("Home");

  useEffect(()=>{

  });
  
  return (
    <div className="h-screen scrollbar-hide overflow-y-auto">
      <header className="flex mt-5 h-[calc(8vh - 54px)] flex-row-reverse justify-between items-center">
        <div className="flex-grow"></div>
        <img className="m-4 w-[110px]" src={Mylist} alt="Mylist" />
      </header>
      <main className="flex flex-col items-center justify-center gap-4 h-[calc(80vh - 82px)] mt-[38px] mb-[44px]">
        <img
          className="h-[600px] sm:h-[420px] md:h-[540px] lg:h-[520px]"
          src={mainGraphic}
          alt="Main Graphic"
        />
      </main>
      <footer className="h-[12vh] w-full flex justify-center items-center">
        <Link className="w-buttonWidth" to={"/login"}>
          <div className="flex flex-row h-[58px] bg-neutral-200 rounded-[30px] justify-center items-center">
            <div className="text-[15px] font-normal">
              <b>{t("makemylist")}</b>
            </div>
          </div>
        </Link>
      </footer>
    </div>
  );
};

export default WelcomeComponent;
