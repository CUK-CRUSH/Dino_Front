import { FaAngleLeft, FaEllipsisVertical } from "react-icons/fa6";

export const MainEditButton: React.FC = () => {
  return (
    <div className="flex  h-[5.666666%] items-center justify-between m-3 text-[19px]">
      <div>
        <button className="text-red-500">
          <FaAngleLeft color="white" size={20} />
        </button>
      </div>
      <div>
        <button>
          <FaEllipsisVertical color="white" size={20} />
        </button>
      </div>
    </div>
  );
};
