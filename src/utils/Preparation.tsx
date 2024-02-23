import { useCallback } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Prepare from "@assets/Preparation/Waiting.svg";
import Footer from "@components/Layout/footer";

const PreparationPage = () => {
  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div className="h-full min-h-screen w-full scrollbar-hide overflow-scroll flex  flex-col bg-white text-black text-[15px] font-medium leading-[18px]">
      <header className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px] border-b-[1px] border-[#EFEFEF]">
        <button
          type="button"
          onClick={handleBack}
          className="text-white self-start mt-2"
        >
          <FaAngleLeft size={24} color="black" />
        </button>
      </header>
      <main className="flex w-full h-[80vh] justify-center items-center flex-col">
        <img src={Prepare} alt="준비중" />
        <div className="font-semibold text-[17px] leading-4 text-center mt-5 space-y-2">
          <p>아직 준비중입니다!</p>
          <p>조금만 기다려주세요!</p>
        </div>
      </main>
      <Footer bgColor="bg-white" />
    </div>
  );
};
export default PreparationPage;
