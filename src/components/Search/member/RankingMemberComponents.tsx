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
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import truncateText from "@utils/truncateText/truncateText";

interface SearchMemberProps {
  rank: number;
  member: Member | undefined;
  username_fontSize: string;
  introduction_fontSize: string;
  customMargin: number;
  size: string;
  marginY: string;
}
const RankingMemberComponents: React.FC<SearchMemberProps> = ({ rank, member, size, marginY, username_fontSize, introduction_fontSize, customMargin }) => {

  const navigate = useNavigate();
  const rankedImage = [first, second, third, four, five, six, seven, eight, nine, ten];

  const handleNavigate = (username: string,) => {
    navigate(`/user/${username}`);
  }

  const { windowSize } = useWindowSizeCustom();
  return (
    <div className="">

      {member &&
        <div
          className={`flex flex-row cursor-pointer relative `}
          style={{ width: `calc(100% - ${customMargin}px)`, marginLeft: `${customMargin}px`, marginBottom: `${marginY}` }}
          key={member.id}
          onClick={() => handleNavigate(member.username)}>

          <img src={rankedImage[rank]} alt='x' />

          <img
            className={`rounded-full object-cover`}
            style={{ width: size, height: size, marginLeft: customMargin }}
            src={member.profileImageUrl ? member.profileImageUrl : defaultImage} // default.jpg는 기본 이미지 경로입니다.
            alt="썸네일"
          />
          <div
            className="flex flex-col justify-start "
            style={{ marginLeft: customMargin }}
          >

            <p className={`text-[${username_fontSize}] font-PretendardBold`}>{truncateText(member.username, windowSize.width, 18,true)}</p>
            <p className={`text-[${introduction_fontSize}] font-PretendardMedium`}>{truncateText(member.introduction, windowSize.width, 15,true)}</p>
          </div>

        </div>
      }
      <div className="bg-transparents h-[20px]" />
    </div>
  )
}

export default RankingMemberComponents;