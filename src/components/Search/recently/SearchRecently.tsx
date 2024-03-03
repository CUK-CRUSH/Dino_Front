import SearchNotLogin from "../part/SearchNotLogin";
import SearchRecentlyWord from "./SearchRecentlyWord";

interface setOpenSearchRecentlyDTO{
  setOpenSearchRecently : React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchRecently: React.FC<setOpenSearchRecentlyDTO> = ({setOpenSearchRecently}) => {
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      {refreshToken ? 
      <SearchRecentlyWord setOpenSearchRecently={setOpenSearchRecently}/>
      : <SearchNotLogin />
    }
    </div>
  );
};

export default SearchRecently;
