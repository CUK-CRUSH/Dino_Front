import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsePlayListEditor } from "@hooks/UsePlayListEditor";
import { RootState } from "@store/index";
import { EditPlsyListDTO } from "types/EditplayList";
import { EditPlaylistControls } from "@components/EditList/Button/EditPlaylistControl";
import { MusicDataRow } from "@components/EditList/MusicList/MusicDataRow";
import { PlusButton } from "@components/EditList/Button/PlusButton";
import ShowImage from "@components/EditList/EditImage/ShowImage";
import { MainEditButton } from "@components/EditList/Button/MainEditButton";
import { MusicTitle } from "@components/EditList/MusicList/MusicTitle";
import { useCookies } from "react-cookie";
import { getSinglePlayList } from "@api/playlist-controller/playlistControl";
import { getMusicList } from "@api/music-controller/musicControl";
import { useParams } from "react-router-dom";
import NotFound from "@pages/NotFound/NotFonud";
import Footer from "@components/Layout/footer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { playlistNameState } from "@atoms/Playlist/playlistName";
import { getMemberUsername } from "@api/member-controller/memberController";
import { musicListState } from "@atoms/Musics/MusicList";
import { userNameState } from "@atoms/Playlist/username";
import { playlistIdState } from "@atoms/Playlist/playlistId";
import { tokenState } from "@atoms/Playlist/token";
import Recommendation from "@components/Recommend/Recommendation";
import LikeButton from "@components/Likes/LikeButton";
import VisitorButton from "@components/Visitor/VisitorButton";
import { useDispatch } from "react-redux";
import { setMemberId } from "@reducer/editPlayList/isMemberId";
import useImageCompress from "@hooks/useImageCompress";
// import { useTranslation } from "react-i18next";
import { useTutorial } from "@hooks/useTutorial/useTutorial";
import { setIsEditing } from "@reducer/editPlayList/isEdit";

const PlayList: React.FC<EditPlsyListDTO> = () => {
  const dispatch = useDispatch();
  const isEditing = useSelector(
    (state: RootState) => state.editPlaylistToggle.isEditing
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);

  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const memberId = useSelector((state: RootState) => state.memberId);
  const [playlists, setPlaylists] = useState<any[]>([]);

  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  // 유저이름
  const { username: paramUsername } = useParams<{
    username: string | undefined;
  }>();
  const setUsernames = useSetRecoilState(userNameState);
  //

  const [playlistName, setPlaylistName] = useRecoilState(playlistNameState);
  const [musicList, setMusicList] = useRecoilState(musicListState);

  const [hasError, setHasError] = useState<boolean>(false);

  // 플레이리스트 아이디
  const { playlistId } = useParams<{ playlistId: string }>();
  const setPlaylistId = useSetRecoilState(playlistIdState);
  //

  // 쿠키에서 유저 id 가져오기
  const [cookies] = useCookies(["accessToken"]);

  const setToken = useSetRecoilState(tokenState);
  // const { t } = useTranslation("AddPlayList");

  const { tutorialStep, toggleTutorialMode, setTutorialStep } = useTutorial();
  const isTutorialMode = tutorialStep !== null;

  // session 꼼수 사용
  const { compressImage } = useImageCompress();
  const readImageFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject("File read error");
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUploadImage = async (image: string) => {
    setUploadImage(image);
    const response = await fetch(image);
    const blob = await response.blob();
    const file = new File([blob], image, { type: "image/png" });
    const compressedFile = await compressImage(file);

    if (compressedFile) {
      const result = await readImageFile(compressedFile.compressedFile);
      sessionStorage.setItem("uploadImage", result);

      const sizeInBytes = result.length * 2; // 각 문자는 대략 2바이트
      const sizeInKilobytes = sizeInBytes / 1024; // 1KB = 1024바이트
      console.log(`Estimated size of uploadImage: ${sizeInKilobytes} KB`);
    } else {
      console.error("Failed to compress the image.");
    }
  };
  //session 꼼수 사용

  const fetchPlaylist = useCallback(async () => {
    try {
      const member = await getMemberUsername(paramUsername);

      if (member) {
        dispatch(setMemberId(member.data.id)); // memberId 저장
      }

      setUsernames(paramUsername || "");

      // 0.3초 지연
      await new Promise((resolve) => setTimeout(resolve, 300));
      const [playlist, musicAPIData] = await Promise.all([
        getSinglePlayList(Number(playlistId)),
        getMusicList(Number(playlistId)),
      ]);

      setPlaylists(playlist.data);
      setPlaylistName(playlist.data.playlistName);
      setMusicList(musicAPIData);
      setSelectedVideoId(null);
      setSelectedVideoIndex(null);
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [setMusicList, paramUsername, dispatch, playlistId]);

  const {
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    handleDeleteClick,
  } = UsePlayListEditor({
    playlists,
    fetchPlaylist,
    setPlaylistName,
    uploadImage,
  });

  useEffect(() => {
    setPlaylistId(Number(playlistId));
    setToken(cookies.accessToken);
    fetchPlaylist();

    const savedPlaylistName = sessionStorage.getItem("playlistName");
    if (savedPlaylistName) {
      setPlaylistName(savedPlaylistName);
    }

    const savedImage = sessionStorage.getItem("uploadImage");
    if (savedImage) {
      setUploadImage(savedImage);
    }
  }, [playlistId, fetchPlaylist, setPlaylistId, cookies.accessToken, setToken]);

  useEffect(() => {
    // playlist.tsx 컴포넌트가 마운트될 때 튜토리얼 스텝을 'env'로 설정
    if (isTutorialMode) {
      setTutorialStep("env");
    }
  }, [setTutorialStep, isTutorialMode]);

  useEffect(() => {
    if (tutorialStep === "list1") {
      dispatch(setIsEditing(true));
    }
  }, [tutorialStep, dispatch]);

  if (hasError) {
    return <NotFound />;
  }

  const handlePageClick = (e: any) => {
    // 튜토리얼 모드가 아니거나, 현재 튜토리얼 단계가 list2일 때는 함수 실행을 중지
    if (!isTutorialMode || tutorialStep === "list2") {
      e.stopPropagation(); // 이벤트 전파를 막음
      return;
    }

    // list2가 아닐 때만 튜토리얼 모드를 전환
    toggleTutorialMode();
  };

  return (
    <div
      className={`h-screen w-full scrollbar-hide overflow-scroll flex flex-col bg-black text-white font-medium leading-[18px] ${
        isTutorialMode ? "bg-black bg-opacity-50" : ""
      }`}
      onClick={handlePageClick}
    >
      {!isEditing && (
        <MainEditButton
          memberId={memberId}
          playlists={playlists}
          uploadImage={uploadImage}
          fetchPlaylist={fetchPlaylist}
          setPlaylistName={setPlaylistName}
          tutorialStep={tutorialStep}
        />
      )}
      {isEditing && (
        <div className={`${tutorialStep === "list1" ? "z-20" : ""}`}>
          <EditPlaylistControls
            isEditing={isEditing}
            onSave={() => handleSaveClick(uploadImage)}
            onCancel={handleCancelClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            tutorialStep={tutorialStep}
          />
        </div>
      )}
      <ShowImage
        aspectRatio={1}
        onCrop={handleUploadImage}
        setUploadImage={setUploadImage}
        playlists={playlists}
        isEditing={isEditing}
        fetchPlaylist={fetchPlaylist}
        tutorialStep={tutorialStep}
      />
      <div
        className={`relative ${
          tutorialStep === "list2" ? "z-20 pointer-events-none" : ""
        }`}
      >
        <MusicTitle isEditing={isEditing} tutorialStep={tutorialStep} />
      </div>
      <div className="flex flex-row">
        <LikeButton id={musicList.data?.length} />
        <VisitorButton id={musicList.data?.length} />
      </div>

      <MusicDataRow
        isEditing={isEditing}
        fetchPlaylist={fetchPlaylist}
        selectedVideoId={selectedVideoId}
        setSelectedVideoId={setSelectedVideoId}
        selectedVideoIndex={selectedVideoIndex}
        setSelectedVideoIndex={setSelectedVideoIndex}
      />
      {isEditing && musicList.data?.length + musicData.musics.length < 9 && (
        <div className={`relative ${tutorialStep === "list2" ? "z-20" : ""}`}>
          <PlusButton
            playlists={playlists}
            tutorialStep={tutorialStep}
            setTutorialStep={setTutorialStep}
          />
        </div>
      )}
      {playlistName?.length > 0 && !isEditing && (
        <div
          className={`relative ${
            tutorialStep === "env" ? "z-20 pointer-events-none" : ""
          }`}
        >
          <Recommendation tutorialStep={tutorialStep} />
        </div>
      )}

      {!isEditing && <Footer bgColor="black" />}
     
    </div>
  );
};

export default PlayList;
