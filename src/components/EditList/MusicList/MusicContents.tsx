import { MusicDataRowContentProps } from "types/EditplayList";
import trashMusic from "@assets/PlayListImage/musicTrash.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "@styles/EditList/playList.css";
import Swal from "sweetalert2";
import { deleteMusicList } from "@api/music-controller/musicControl";
import { useEffect, useRef, useState } from "react";
import ToastComponent from "@components/Toast/Toast";
import { setToast } from "@reducer/Toast/toast";
import { RootState } from "@store/index";
import { updateArtist, updateTitle, updateUrl } from "@reducer/musicadd";
import YouTube from "react-youtube";
import { useRecoilValue } from "recoil";
import { musicListState } from "@atoms/Musics/MusicList";

export const MusicDataRowContent: React.FC<MusicDataRowContentProps> = ({
  musicData,
  order,
  playlistId,
  usernames,
  isEditing,
  token,
  setWidth,
  fetchPlaylist,
  selectedVideoId,
  width,
  selectedVideoIndex,
  index,
  setSelectedVideoId,
  setSelectedVideoIndex,
}) => {
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
  const { toast } = useSelector((state: RootState) => state.toast);
  const [titleWidth, setTitleWidth] = useState(0);
  const [artistWidth, setArtistWidth] = useState(0);
  const titleRef = useRef<HTMLSpanElement>(null);
  const artistRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 플리 음악 갯수구하기
  const musicList = useRecoilValue(musicListState);
  const musicList_Length = musicList.data.length;
  //

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = () => {
    if (isEditing && musicData.id < 100000) {
      dispatch(updateTitle(musicData.title));
      dispatch(updateArtist(musicData.artist));
      dispatch(updateUrl(musicData.url));
      navigate(`/user/${usernames}/${playlistId}/edit/${musicData.id}`);
    }
  };

  const handleDeleteClick = () => {
    swalButton
      .fire({
        title: "노래를 삭제하시겠습니까?",
        html: "한번 삭제된 노래는 복구할 수 없습니다!",
        showCancelButton: true,
        confirmButtonColor: "blue",
        cancelButtonColor: "#d33",
        confirmButtonText: "취소",
        cancelButtonText: "삭제",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          // '취소' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // '삭제' 버튼을 눌렀을 때 실행할 코드를 여기에 작성합니다.
          try {
            await deleteMusicList(musicData.id, token);
            dispatch(setToast("delete"));
            fetchPlaylist();
          } catch (error) {
            console.log(error);
            swalButton.fire({
              title: "노래 삭제에 실패했습니다.",
              width: "250px",
            });
          }
        }
      });
  };

  useEffect(() => {
    if (titleRef.current && artistRef.current) {
      const titleElement = titleRef.current;
      const artistElement = artistRef.current;
      const titleWidth = titleElement.scrollWidth;
      const artistWidth = artistElement.scrollWidth;
      if (contentRef.current) {
        setWidth(contentRef.current.offsetWidth);
      }
      setTitleWidth(titleWidth);
      setArtistWidth(artistWidth);
    }
  }, [musicData, contentRef, setWidth]);

  const TitleLength = titleWidth >= 205;
  const ArtistLength = artistWidth >= 110;

  const handleStateChange = (event: any) => {
    if (event.data === 0 && selectedVideoIndex !== null) {
      const nextIndex = (selectedVideoIndex + 1) % musicList_Length;
      if (Array.isArray(musicList.data) && musicList.data[nextIndex]) {
        setSelectedVideoIndex(nextIndex);
        const url = musicList.data[nextIndex].url;

        let videoId = "";
        const urlParams = new URLSearchParams(url.split("?")[1]);

        if (urlParams.has("v")) {
          // 웹 버전
          videoId = urlParams.get("v")!;
        } else if (urlParams.has("si") || urlParams.has("feature")) {
          // 축약 URL
          videoId = url.split("?")[0].split("/").pop()!;
        }

        setSelectedVideoId(videoId);
      }
    }
  };
  return (
    <div ref={contentRef} className="relative flex justify-between mb-2 mx-2">
      <div
        style={{
          height:
            selectedVideoId && selectedVideoIndex === index ? "380px" : "50px",
        }}
        onClick={handleEditClick}
        className={`flex flex-col ${
          isEditing ? "" : "w-full"
        } w-full items-center p-3  px-[7px] rounded-[15px] bg-[#2E2E2E] cursor-pointer`}
      >
        <div className="flex w-full mt-1 items-center mb-5">
          <div className="ml-2 w-1/12">
            <span>{order}</span>
          </div>
          <div className="w-7/12 overflow-hidden">
            <div className="flex items-center">
              <span
                ref={titleRef}
                className={`flex-shrink-0 ${
                  TitleLength ? "animate-marquee" : ""
                }`}
              >
                {musicData.title}
              </span>
            </div>
          </div>
          <div className="text-[13px] w-4/12 pl-3 overflow-hidden">
            <div className="flex items-center">
              <span
                ref={artistRef}
                className={`flex-shrink-0 ${
                  ArtistLength ? "animate-marquee" : ""
                }`}
              >
                {musicData.artist}
              </span>
            </div>
          </div>
        </div>
        {!isEditing && selectedVideoId && selectedVideoIndex === index && (
          <YouTube
            videoId={selectedVideoId}
            opts={{
              width: `${width}`,
              height: "300",
              playerVars: {
                autoplay: 1,
                modestbranding: 1,
              },
            }}
            onStateChange={handleStateChange}
          />
        )}
      </div>

      {isEditing && musicData.id < 100000 && (
        <div
          onClick={handleDeleteClick}
          className={`flex ml-2 mx-1 items-center absolute bottom-4 right-2`}
        >
          <img className="w-5 h-5" src={trashMusic} alt="trash" />
        </div>
      )}

      {toast === "delete" && (
        <ToastComponent background="white" text="노래가 삭제되었습니다." />
      )}
    </div>
  );
};
