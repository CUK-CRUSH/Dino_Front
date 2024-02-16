import { FaCirclePlus } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export const DeleteButton: React.FC = () => {
  const { t } = useTranslation("Edit");
  return (
    <div className="absolute bottom-0 inset-x-0 mb-[5vh] smartPhone:mb-[15vh] tabletMini:mb-[32vh] tablet:mb-[42vh] flex items-center justify-center text-black">
      <button className="w-[191px] h-[50px] flex justify-center items-center flex-row bg-white rounded-[50px] space-x-2">
        <FaCirclePlus size={32} />
        <span className="font-extrabold"> 삭제하기</span>
      </button>
    </div>
  );
};
