import BeforeLike from "@assets/Like/BeforeLike.svg";
import AfterLike from "@assets/Like/AfterLike.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { setIsLikeToggle } from "@reducer/Likes/likeToggle";

const LikeButton = () => {
  const dispatch = useDispatch();
  const isLikeToggle = useSelector(
    (state: RootState) => state.likes.isLikeToggle
  );
  const handleLikeToggle = () => {
    dispatch(setIsLikeToggle(!isLikeToggle));
  };
  return (
    <div
      onClick={handleLikeToggle}
      className="absolute -bottom-4 left-4 inline-flex justify-around items-center w-[70px] h-[36px] bg-[#EA4335] rounded-[30px] border-[4px] border-white z-20"
    >
      <img
        className="w-6 h-6"
        src={isLikeToggle ? AfterLike : BeforeLike}
        alt="Like button"
      />
      <span className="mr-2">0</span>
    </div>
  );
};

export default LikeButton;
