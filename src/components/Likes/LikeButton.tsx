import BeforeLike from "@assets/Like/BeforeLike.svg";
import AfterLike from "@assets/Like/AfterLike.svg";
import "@styles/EditList/playList.css";
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
import Swal from "sweetalert2";

const LikeButton = ({ id }: any) => {
  const swalButton = Swal.mixin({
    customClass: {
      popup: "popup", // 전체
      confirmButton: "confirmButton", // 취소
      cancelButton: "cancelButton", // 삭제
      title: "title", // 타이틀
      htmlContainer: "htmlContainer", // 내용
    },
    buttonsStyling: false,
  });

  const navigate = useNavigate();
  const username = useRecoilValue(userNameState);
  ///
  const { playlistId } = useParams<{ playlistId: string }>();

  const [cookies] = useCookies(["accessToken"]);
  const token = cookies.accessToken;

  const [likeCount, setLikeCount] = useState<number>(0);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const handleLikeToggle = async () => {
    if (!token) {
      swalButton
        .fire({
          title: "로그인 필요한 서비스입니다.",
          text: "로그인이 하시겠습니까?",
          showCancelButton: true,
          confirmButtonColor: "blue",
          cancelButtonColor: "#d33",
          confirmButtonText: "취소",
          cancelButtonText: "로그인",
        })
        .then((result) => {
          if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/login");
          }
        });
      return;
    }
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
    const delay = 200;
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
      fetchPlaylist();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [fetchPlaylist]);

  return (
    <div className="bg-black inline-flex px-1  rounded-[30px] ml-4">
      <div className="p-1 rounded-full">
        <img
          className="w-6 h-6"
          onClick={handleLikeToggle}
          src={isLike ? AfterLike : BeforeLike}
          alt="Like button"
        />
      </div>
      {id === undefined ? null : (
        <div onClick={handleNavigate} className="mx-2 mt-2">
          <span className="text-center font-semibold">
            {likeCount < 1000 ? likeCount : "999+"}
          </span>
        </div>
      )}
    </div>
  );
};

export default LikeButton;
