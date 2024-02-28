import SearchRecentlyWord from "./SearchRecentlyWord";


const SearchRecently: React.FC = () => {
  return (
    <div className="w-full h-full relative bg-white flex flex-col justify-start scrollbar-hide overflow-scroll font-PretendardMedium">
      <SearchRecentlyWord />
    </div>
  );
};

export default SearchRecently;
