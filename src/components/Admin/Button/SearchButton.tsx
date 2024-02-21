import { useNavigate, useParams } from "react-router-dom";
import search from "@assets/Admin/search.svg";
import { useEffect } from "react";

interface MyComponentProps {
  authority?: boolean; // boolean 또는 undefined를 받을 수 있도록 수정
}

const SearchButton: React.FC<MyComponentProps> = ({ authority }) => {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string | undefined }>();
  const handleNavigateEnv = () => {
    navigate(`/user/${username}/env`);
  };

  useEffect(()=>{

  },[])

  return (
    <div className={`w-[22px] h-[40px] right-[${authority ? '50px' : '20px'}] top-[20px] absolute`}>
      <button
        className=" text-white text-3xl font-bold tracking-wider "
        onClick={handleNavigateEnv}
      >
        <img src={search} alt='' />

      </button>
    </div>
  );
};

export default SearchButton;
