import React, { useEffect, useState } from "react";
import { AddPlayList } from "@components/Admin/playlist/AddPLayList";
import UserProfileBackground from "./UserProfileBackgroundImage";
import UserProfileImage from "./UserProfileImage";
import UserProfileInfo from "./UserProfileInfo";
import { PlayList } from "@components/Admin/playlist/PlayList";
import { getMemberUsername } from "@api/member-controller/memberController";
import { getMemberDTO, getPlaylistDTO } from "types/Admin";
import { useParams } from "react-router-dom";
import ToastComponent from "@components/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import Footer from "@components/Layout/footer";
import Header from "@components/Layout/header";
import useCompareToken from "@hooks/useCompareToken/useCompareToken";
import { setProfileIntroduction } from "@reducer/Admin/userProfileSlice";
import ShareImg from "@assets/Share.svg";
import { Img } from "react-image";
import SkeltonPlaylist from "./SkeltonPlaylist";
import { useCustomPlaylistMargin } from "@hooks/useCustomMargin/useCustomPlaylistMargin";
import { useTranslation } from "react-i18next";
import { fetchPlaylistData } from "@reducer/Admin/adminPlaylist";
import { useSetRecoilState } from "recoil";
import { adminuserNameState } from "@atoms/Admin/adminUsername";
import Tutorial from "@components/Tutorial/Tutorial";

const AdminPage: React.FC = () => {
  const getDefaultMember = (): getMemberDTO => ({
    backgroundImageUrl: null,
    id: undefined,
    introduction: "",
    name: undefined,
    oauth2id: undefined,
    profileImageUrl: null,
    username: "",
  });

  // skelton margin
  const customPlaylistMargin = useCustomPlaylistMargin();

  // 유저데이터
  const [userData, setUserdata] = useState<getMemberDTO>(getDefaultMember);

  const { username } = useParams<{ username: string | undefined }>();
  const setAdminUsername = useSetRecoilState(adminuserNameState);

  const [isLoading, setIsLoding] = useState<boolean>(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResult = await getMemberUsername(username);
        
        setUserdata(userDataResult.data);
        dispatch(setProfileIntroduction(userDataResult.data.introduction));

        if (userDataResult.data?.id) {
          localStorage.setItem("userId", userDataResult.data.id.toString());
        }
        if (Date.now() / 1000 > Number(localStorage.getItem("exp"))) {
          localStorage.removeItem("accessToken");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const delay = 500;
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
      fetchData();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [username, dispatch]);

  const { deleteProfileImage, deleteBackgroundImage } = useSelector(
    (state: RootState) => state.userProfile
  );

  useEffect(() => {
    if (deleteProfileImage) {
      setUserdata((prevData) => ({
        ...prevData,
        profileImageUrl: null,
      }));
    }
  }, [deleteProfileImage]);

  useEffect(() => {
    if (deleteBackgroundImage) {
      setUserdata((prevData) => ({
        ...prevData,
        backgroundImageUrl: null,
      }));
    }
  }, [deleteBackgroundImage]);

  const playlistData = useSelector(
    (state: RootState) => state.adminPlaylist.playlistData
  );

  const status = useSelector((state: RootState) => state.adminPlaylist.status);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPlaylistData(username));
    }
  }, [username, dispatch]);

  useEffect(() => {
    if (username) {
      setAdminUsername(username);
    }
  }, [username]);

  // 토스트
  const { toast } = useSelector((state: RootState) => state.toast);

  const { t } = useTranslation("AdminAdmin");

  // 권한부여
  const authority = useCompareToken(userData && userData?.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "MyList",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Web Share API is not supported in your browser.");
    }
  };

  // const footerHeight = useSizeFooter(playlistData?.length, 80, authority);

  return (
    <div className="h-full scrollbar-hide overflow-scroll relative ">
      <Tutorial username={userData?.username} />
      <Header id={userData.id} authority={authority} />

      <UserProfileBackground
        userBackgroundImage={userData?.backgroundImageUrl}
      />

      {/* 로그인 성공 토스트 */}

      {toast === "login" && (
        <ToastComponent background="white" text={t("login")} />
      )}

      {/* 복사 성공 토스트 */}

      {toast === "copy" && (
        <ToastComponent background="white" text={t("link")} />
      )}

      {/* 검은화면 */}
      <main
        className={`w-full h-[calc(100%)] absolute flex-grid bg-neutral-900 z-10 rounded-tl-[50px] rounded-tr-[50px] `}
      >
        {/* 프로필 이미지 */}

        <UserProfileImage userProfileImage={userData?.profileImageUrl} />
        {userData.id && !authority && (
          <Img
            onClick={handleShare}
            src={ShareImg}
            alt="share"
            className="w-6 h-6 absolute top-4 right-5 cursor-pointer"
          />
        )}

        <UserProfileInfo
          username={userData?.username}
          // introText={userData?.introduction}
        />

        {isLoading && <SkeltonPlaylist customMargin={customPlaylistMargin} />}

        {playlistData &&
          playlistData.map((playlist: getPlaylistDTO, index: number) => (
            <PlayList
              key={playlist.id}
              playlist={playlist}
              fontColor="#fff"
              visible={true}
            />
          ))}

        {!isLoading &&
        authority &&
        playlistData?.length !== undefined &&
        playlistData?.length < 4 ? (
          <AddPlayList />
        ) : (
          <></>
        )}

        {/* 여기까지 플레이리스트 */}
        <div className="absolute -bottom-[0px] w-full">
          <Footer bgColor="neutral-900" />
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
