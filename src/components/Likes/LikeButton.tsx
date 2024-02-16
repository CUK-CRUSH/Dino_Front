import BeforeLike from "@assets/Like/BeforeLike.svg";
import AfterLike from "@assets/Like/AfterLike.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userNameState } from "@atoms/Playlist/username";
import {
  deleteLike,
  getSinglePlayList,
  postLike,
} from "@api/playlist-controller/playlistControl";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const LikeButton = () => {
  const navigate = useNavigate();
  const username = useRecoilValue(userNameState);
  ///
  const { playlistId } = useParams<{ playlistId: string }>();

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);

  const handleLikeToggle = async () => {
    try {
      if (isLike) {
        await deleteLike(Number(playlistId), token);
      } else {
        await postLike(Number(playlistId), token);
      }
      fetchPlaylist();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPlaylist = useCallback(async () => {
    try {
      const playlist = await getSinglePlayList(Number(playlistId), token);
      setIsLike(playlist.data.isLike);
      setLikeCount(playlist.data.likeCount);
    } catch (error) {
      console.error(error);
    }
  }, [playlistId, token]);

  const handleNavigate = () => {
    navigate(`/user/${username}/${playlistId}/like`);
  };
  useEffect(() => {
    fetchPlaylist();
  }, [fetchPlaylist]);

  return (
    <div className="absolute -bottom-5 left-4 bg-black inline-flex justify-between items-center px-1 w-[110px] h-[42px] rounded-[30px] z-20">
      <div className="bg-[#EA4335] p-1 rounded-full">
        <img
          className="w-6 h-6"
          onClick={handleLikeToggle}
          src={isLike ? AfterLike : BeforeLike}
          alt="Like button"
        />
      </div>
      <div onClick={handleNavigate} className="mr-5">
        <span>{likeCount}</span>
      </div>
    </div>
  );
};

export default LikeButton;
