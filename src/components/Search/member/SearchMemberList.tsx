import { Member } from "types/Search/Search";
import defaultImage from "@assets/Admin/defaultImage.svg";
import {  useNavigate } from "react-router-dom";
import truncateText from "@utils/truncateText/truncateText";
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";

interface SearchMemberProps {
  searchResults: Member[] | undefined;
  username_fontSize : string;
  introduction_fontSize : string;
  size : string;
  marginY : string;
}
const SearchMemberList: React.FC<SearchMemberProps> = ({ searchResults,size, marginY,username_fontSize,introduction_fontSize}) => {

    const navigate = useNavigate();

    const handleNavigate = (username : string,) =>{
      navigate(`/user/${username}`);
    }
    const { windowSize } = useWindowSizeCustom();
    const customMargin = useCustomPlaylistMargin();
  return (
    <div className="py-[4%]">

      {searchResults && searchResults.map((member) => (
        <div className={`flex flex-row cursor-pointer relative  `} style={{ marginBottom: marginY }}  key={member.id} onClick={() => handleNavigate(member.username)}>

          <img
            className={`rounded-full object-cover `}
            style={{ width: size, height: size }}
            src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
            alt="썸네일"
          />
          
          <div 
            className="flex flex-col justify-start "
            style={{ marginLeft: customMargin }}
          >
            
            <p className={`text-[${username_fontSize}]`}>{truncateText(member.username, windowSize.width, 18)}</p>
            <p className={`text-[${introduction_fontSize}] `}>{truncateText(member.introduction, windowSize.width, 15)}</p>
          </div>

        </div>
      ))}
      
    </div>
  )
}

export default SearchMemberList;