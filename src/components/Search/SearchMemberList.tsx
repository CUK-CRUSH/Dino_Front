import { Member } from "types/Search/Search";
import defaultImage from "@assets/Admin/defaultImage.svg";
import { Link, useLocation } from "react-router-dom";

interface SearchMemberProps {
  searchResults: Member[] | undefined;
  username_fontSize : string;
  introduction_fontSize : string;
  size : string;
  marginY : string;
}
const SearchMemberList: React.FC<SearchMemberProps> = ({ searchResults,size, marginY,username_fontSize,introduction_fontSize}) => {

    const location = useLocation();
    // URL 파라미터 읽기
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');

  return (
    <div >

      {searchResults && searchResults.map((member) => (
        <div className={`flex flex-row ml-5 `} style={{ marginBottom: marginY }}  key={member.id}>

          <img
            className={`cursor-pointer w-[${size}] h-[${size}]  rounded-lg object-cover `}
            src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
            alt="썸네일"
          />
          <div className="flex flex-col justify-start ml-6">
            <p className={`text-[${username_fontSize}]`}>{member.username}</p>
            <p className={`text-[${introduction_fontSize}] `}>{member.introduction}</p>
          </div>

        </div>
      ))}
      {searchResults && searchResults?.length >= 5 ?
          <Link to={`/search/member?query=${query}`}>
            <div className="flex justify-center">더보기</div>
          </Link>
          : <></>
        }
    </div>
  )
}

export default SearchMemberList;