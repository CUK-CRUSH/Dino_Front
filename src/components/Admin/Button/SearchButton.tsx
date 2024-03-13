import { useNavigate } from "react-router-dom";
import search from "@assets/Admin/search.svg";
import { useEffect } from "react";

interface MyComponentProps {
  authority?: boolean; // boolean 또는 undefined를 받을 수 있도록 수정
}

const SearchButton: React.FC<MyComponentProps> = ({ authority }) => {
  const navigate = useNavigate();
  const handleNavigateSearch = () => {
    navigate(`/search`);
  };

  useEffect(() => {}, []);

  return (
    <div
      className={`z-30  w-[22px] h-[40px] ${
        authority ? "right-[50px]" : "right-[20px]"
      } top-[20px] absolute `}
    >
      <button
        className=" text-white text-3xl font-bold tracking-wider "
        onClick={handleNavigateSearch}
      >
        <img src={search} alt="" />
      </button>
    </div>
  );
};

export default SearchButton;
