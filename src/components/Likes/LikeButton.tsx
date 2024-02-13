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
    <div className="absolute -bottom-5 left-4 bg-black inline-flex justify-between items-center px-1 w-[110px] h-[42px] rounded-[30px] z-20">
      <div className="bg-[#EA4335] p-1 rounded-full">
        <img
          className="w-6 h-6"
          onClick={handleLikeToggle}
          src={isLikeToggle ? AfterLike : BeforeLike}
          alt="Like button"
        />
      </div>
      <div className="mr-5">
        <span>100</span>
      </div>
    </div>
  );
};

export default LikeButton;
