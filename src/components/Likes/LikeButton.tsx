import BeforeLike from "@assets/Like/BeforeLike.svg";
import AfterLike from "@assets/Like/AfterLike.svg";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { setIsLikeToggle } from "@reducer/Likes/likeToggle";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "@atoms/Playlist/username";
import { tokenState } from "@atoms/Playlist/token";
import { deleteLike, postLike } from "@api/playlist-controller/playlistControl";

const LikeButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const username = useRecoilValue(userNameState);
  ///
  const { playlistId } = useParams<{ playlistId: string }>();
  const token = useRecoilValue(tokenState);

  const isLikeToggle = useSelector(
    (state: RootState) => state.likes.isLikeToggle
  );

  const handleLikeToggle = async () => {
    if (isLikeToggle) {
      deleteLike(Number(playlistId), token);
      dispatch(setIsLikeToggle(!isLikeToggle));
    } else {
      console.log(token);
      postLike(Number(playlistId), token);
      dispatch(setIsLikeToggle(!isLikeToggle));
    }
  };

  const handleNavigate = () => {
    navigate(`/user/${username}/${playlistId}/like`);
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
      <div onClick={handleNavigate} className="mr-5">
        <span>0</span>
      </div>
    </div>
  );
};

export default LikeButton;
