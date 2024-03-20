import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import defaultImage from "@assets/Admin/defaultImage.svg";
import truncateText from "@utils/truncateText/truncateText";
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";

const UserProfile = ({ user }: any) => {
  const navigate = useNavigate();

  const handleProfileClick = useCallback(() => {
    navigate(`/user/${user.username}`);
  }, [navigate, user.username]);
  const { windowSize } = useWindowSizeCustom();

  return (
    <main className="flex items-center justify-between p-[4%]">
      <div className="flex items-center">
        <img
          src={user.profileImageUrl ? user.profileImageUrl : defaultImage}
          alt="프로필 이미지"
          className="w-14 h-14 rounded-full"
        />
        <div className="ml-[4%]">
          <h2 className="text-lg font-bold">{truncateText(user.username, windowSize.width, 22)}</h2>
          <p className="text-sm text-gray-500">{truncateText(user.introduction, windowSize.width, 18)}</p>
        </div>
      </div>
      <button
        onClick={handleProfileClick} /* 프로필 바로가기 기능 구현 */
        className="px-[4%] py-[2%] text-sm bg-black text-white rounded-2xl"
      >
        프로필
      </button>
    </main>
  );
};

export default UserProfile;
