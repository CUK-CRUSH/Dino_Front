import React, { useEffect, useState } from "react";
import { AddPlayList } from "@components/Admin/Button/AddPLayList";
import UserProfileBackground from "./UserProfileBackgroundImage";
import UserProfileImage from "./UserProfileImage";
import UserProfileInfo from "./UserProfileInfo";
import { PlayList } from "@components/Admin/Button/PlayList";
import { getMemberUsername } from "@api/member-controller/memberController";
import { getMemberDTO, getPlaylistDTO } from "types/Admin";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { useParams } from "react-router-dom";
import ToastComponent from "@components/Toast/Toast";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import Footer from "@components/Layout/footer";
import { useCookies } from "react-cookie";
// import InduceButton from "@components/AdminEdit/Button/IndeceButton";
import Header from "@components/Layout/header";
import {useTranslation} from "react-i18next";



const AdminPage: React.FC = () => {
  const tokenId = Number(localStorage.getItem("tokenId"));
  const userId = Number(localStorage.getItem("userId"));
  const getDefaultMember = (): getMemberDTO => ({
    backgroundImageUrl: null,
    id: undefined,
    introduction: "",
    name: undefined,
    oauth2id: undefined,
    profileImageUrl: null,
    username: "",
  });
  // 유저데이터
  const [userData, setUserdata] = useState<getMemberDTO>(getDefaultMember);

  // 플레이리스트 데이터
  const [playlistData, setPlaylistdata] = useState<
    getPlaylistDTO[] | undefined
  >();

  const { username } = useParams<{ username: string | undefined }>();

  localStorage.setItem("username", username ? username : "");

  const [isLoading, setIsLoding] = useState<boolean>(true);

  const [, setInduceLogin] = useState<boolean>(false);
  // 쿠키
  const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!cookies.accessToken) {
      setInduceLogin(false);
    } else {
      setInduceLogin(true);
    }
  }, [cookies.accessToken]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResult = await getMemberUsername(username);

        setUserdata(userDataResult.data);
        if (userDataResult.data?.id) {
          localStorage.setItem("userId", userDataResult.data.id.toString());
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
  }, [username]);

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
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const playlistDataResult = await getPlayList(username);
        setPlaylistdata(playlistDataResult.data);
      } catch (error) {
        console.error("Error fetching playlist data:", error);
      }
    };

    fetchPlaylistData();
  }, [username, userData]);

  // 토스트
  const { toast } = useSelector((state: RootState) => state.toast);

  const {t} = useTranslation("AdminAdmin");

  return (
    <div className="relative w-full h-full mx-auto scrollbar-hide overflow-scroll flex flex-col justify-between bg-neutral-900">
      <Header />

      <UserProfileBackground
        userBackgroundImage={userData?.backgroundImageUrl}
      />
      {/* 로그인 여부 */}
      {/* {!induceLogin ? <InduceButton /> : <></>} */}

      {/* 플레이리스트 생성 성공 토스트 */}

      {toast === "add" && (
        <ToastComponent
          background="white"
          text={t("newplaylist")}
        />
      )}

      {/* 로그인 성공 토스트 */}

      {toast === "login" && (
        <ToastComponent background="white" text={t("login")} />
      )}
      {/* 프로필 성공 토스트 */}

      {toast === "profile" && (
        <ToastComponent
          background="white"
          text={t("profile")}
        />
      )}

      {/* 프로필 실패 토스트 */}
      {toast === "not_profile" && (
        <ToastComponent
          background="white"
          text={t("profilefail")}
        />
      )}
      {/* 복사 성공 토스트 */}

      {toast === "copy" && (
        <ToastComponent background="white" text={t("link")} />
      )}

      <div className="w-full bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px] -mt-[180px]">
        {/* 프로필 이미지 */}
        <div className=" flex items-center flex-col z-10">
          <UserProfileImage userProfileImage={userData?.profileImageUrl} />
        </div>

        <UserProfileInfo
          username={userData?.username}
          introText={userData?.introduction}
        />

        {playlistData &&
          playlistData.map((playlist: getPlaylistDTO, index: number) => (
            <PlayList key={playlist.id} playlist={playlist} />
          ))}

        {!isLoading &&
        userId === tokenId &&
        tokenId &&
        playlistData?.length !== undefined &&
        playlistData.length < 4 ? (
          <AddPlayList />
        ) : (
          <></>
        )}
      </div>
      <Footer bgColor="neutral-900" />
    </div>
  );
};

export default AdminPage;
