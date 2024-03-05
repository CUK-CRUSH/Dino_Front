import { Member } from "types/Search/Search";
import defaultImage from "@assets/Admin/defaultImage.svg";
import {  useNavigate } from "react-router-dom";

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
  return (
    <div className="py-4">

      {searchResults && searchResults.map((member) => (
        <div className={`flex flex-row cursor-pointer  `} style={{ marginBottom: marginY }}  key={member.id} onClick={() => handleNavigate(member.username)}>

          <img
            className={`rounded-full object-cover `}
            style={{ width: size, height: size }}
            src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
            alt="썸네일"
          />
          <div className="flex flex-col justify-start ml-6">
            <p className={`text-[${username_fontSize}]`}>{member.username}</p>
            <p className={`text-[${introduction_fontSize}] `}>{member.introduction}</p>
          </div>

        </div>
      ))}
      
    </div>
  )
}

export default SearchMemberList;