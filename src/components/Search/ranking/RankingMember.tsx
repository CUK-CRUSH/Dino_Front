import OptionHeader from "@components/Layout/optionHeader";
import { fetchSearchMemberRanking } from "@reducer/Search/getSearchMemberRanking";
import { AppDispatch, RootState } from "@store/index";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import hot from "@assets/Search/hot.svg";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import RankingMemberComponents from "../member/RankingMemberComponents";
import { Member } from "types/Search/Search";

const RankingMember: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchMemberrankingData = useSelector((state: RootState) => state.searchMemberRanking.searchMemberRanking);
  const status = useSelector((state: RootState) => state.searchMemberRanking.status);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === "idle" && !searchMemberrankingData.length) {
      dispatch(fetchSearchMemberRanking());
    }
  }, [dispatch]);
  const customMargin = useCustomPlaylistMargin();

  return (
    <div className="w-full h-full relative bg-white scrollbar-hide overflow-scroll font-PretendardMedium ">
      <OptionHeader />
      <div className='h-full'>

        <p className="flex justify-center "><img src={hot} alt='x' /> &nbsp; 인기 유저</p>
        <p style={{ marginLeft: customMargin }} className={`py-4 font-PretendardBold underline underline-offset-4	`}>랭킹</p>


        {searchMemberrankingData &&
          searchMemberrankingData.map((member: Member, index: number) => (
            <RankingMemberComponents
              rank={index}
              key={member.id}
              member={member} 
              username_fontSize='18px'
              introduction_fontSize='15px'
              size='60px'
              customMargin={customMargin}
              marginY='10px' />
          ))}

      </div>

    </div>
  )
}

export default RankingMember;