import { Member } from "types/Search/Search";
import defaultImage from "@assets/Admin/defaultImage.svg";

interface SearchMemberProps {
  searchResults: Member[] | undefined;
}
const SearchUser: React.FC<SearchMemberProps> = ({ searchResults }) => {
  return (
    <div className="mt-10">
      유저
        {searchResults && searchResults.map((member) => (
          <div className="flex flex-row my-5" key={member.id}>

            <img
              className="cursor-pointer w-[45px] h-[45px] rounded-lg object-cover "
              src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
              alt="썸네일"
            />
            <div className="flex flex-col justify-start ml-6">
            <p>{member.username}</p>
            <p>{member.introduction}</p>
            </div>

          </div>
        ))}
        <div className="flex justify-center">더보기</div>
    </div>
  )
}

export default SearchUser;