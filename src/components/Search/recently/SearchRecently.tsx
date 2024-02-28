import SearchNotLogin from "../part/SearchNotLogin";
import SearchRecentlyWord from "./SearchRecentlyWord";


const SearchRecently: React.FC = () => {
  const refreshToken = localStorage.getItem('refreshToken');

  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      {refreshToken ? 
      <SearchRecentlyWord />
      : <SearchNotLogin />
    }
    </div>
  );
};

export default SearchRecently;
