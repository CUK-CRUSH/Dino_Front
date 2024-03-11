import { Member } from "types/Search/Search";
import defaultImage from "@assets/Admin/defaultImage.svg";
import { useNavigate } from "react-router-dom";
import first from "@assets/Ranking/member/1.svg";
import second from "@assets/Ranking/member/2.svg";
import third from "@assets/Ranking/member/3.svg";
import four from "@assets/Ranking/member/4.svg";
import five from "@assets/Ranking/member/5.svg";
import six from "@assets/Ranking/member/6.svg";
import seven from "@assets/Ranking/member/7.svg";
import eight from "@assets/Ranking/member/8.svg";
import nine from "@assets/Ranking/member/9.svg";
import ten from "@assets/Ranking/member/10.svg";

interface SearchMemberProps {
  rank: number;
  member: Member | undefined;
  username_fontSize: string;
  introduction_fontSize: string;
  customMargin : number;
  size: string;
  marginY: string;
}
const RankingMemberComponents: React.FC<SearchMemberProps> = ({ rank, member, size, marginY, username_fontSize, introduction_fontSize,customMargin }) => {

  const navigate = useNavigate();
  const rankedImage = [first, second, third, four, five, six, seven, eight, nine, ten];

  const handleNavigate = (username: string,) => {
    navigate(`/user/${username}`);
  }
  return (
    <div className="">

      {member &&
        <div className={`flex flex-row cursor-pointer relative`} style={{ marginBottom: marginY , left : customMargin}} key={member.id} onClick={() => handleNavigate(member.username)}>
          <img src={rankedImage[rank]} alt='x' className="absolute top-[15px] " />

          <img
            className={`rounded-full object-cover absolute left-[15%]`}
            style={{ width: size, height: size }}
            src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
            alt="썸네일"
          />
          <div className="flex flex-col justify-start ml-6 absolute left-[28%] ">
            <p className={`text-[${username_fontSize}]`}>{member.username}</p>
            <p className={`text-[${introduction_fontSize}] `}>{member.introduction}</p>
          </div>

        </div>
      }
    </div>
  )
}

export default RankingMemberComponents;