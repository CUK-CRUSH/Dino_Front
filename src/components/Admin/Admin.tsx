import React, { useEffect, useState } from "react";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { AddPlayList } from "@components/Admin/Button/AddPLayList";
import { EditProfile } from "@components/Admin/Modal/EditProfile";
import UserProfileBackground from "./UserProfileBackgroundImage";
import OpenOption from "./Button/OpenOption";
import UserProfileImage from "./UserProfileImage";
import UserProfileInfo from "./UserProfileInfo";
import { PlayList } from "@components/Admin/Button/PlayList";
import { getMemberUsername } from "@api/member-controller/memberController";
import { getMemberDTO, getPlaylistDTO } from "types/Admin";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { useParams } from "react-router-dom";
import Skeleton from "@components/Skeleton.tsx/Skeleton";
import ToastComponent from "@components/Toast/Toast";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

const AdminPage: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // 유저데이터
  const [userData, setUserdata] = useState<getMemberDTO>();

  // 플레이리스트 데이터
  const [playlistData, setPlaylistdata] = useState<getPlaylistDTO[]>();

  const { username } = useParams<{ username: string | undefined }>();

  const [isLoading, setIsLoding] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (username !== userData?.username) {
        try {
          const userDataResult = await getMemberUsername(username);
          setUserdata(userDataResult.data);
          console.log(userDataResult);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    const delay = 1200; // 1.2 second
    const timeoutId = setTimeout(() => {
      setIsLoding(false);
      fetchData();
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [username, userData]);

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

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  // 옵션 모달 열기 이벤트
  const [optionsModalPosition, setOptionsModalPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  // 옵션모달 열리는 창 위치
  const calculateOptionsModalPosition = (e: React.MouseEvent<EventTarget>) => {
    const button = e.target as HTMLElement;
    const rect = button.getBoundingClientRect();

    setOptionsModalPosition({
      top: rect.top + rect.height,
      left: rect.left - 160 + rect.width,
    });

    openOptionsModal();
  };

  // 토스트
  const { toast } = useSelector(
    (state: RootState) => state.toast
  );

  return (
    <div className=" h-full w-full relative bg-white">
      {isLoading ? <Skeleton width="100px" height="100%" /> :
        <UserProfileBackground
          userBackgroundImage={userData?.backgroundImageUrl}
        />
      }
      {/* 플레이리스트 생성 성공 토스트 */}

      {toast === 'add'  && <ToastComponent background="white" text="새로운 플레이리스트 생성이 완료되었습니다 !" />}
      
      {/* 로그인 성공 토스트 */}

      {toast === 'login'  && <ToastComponent background="white" text="로그인 성공 ! " />}
      {/* 프로필 성공 토스트 */}

      {toast === 'profile'  && <ToastComponent background="white" text="프로필이 정상적으로 수정되었습니다 !" />}

      {/* 복사 성공 토스트 */}

      {toast === 'copy'  && <ToastComponent background="white" text="링크가 복사되었습니다." />}

      <div className="h-full w-full left-0 top-[165px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]">
        {/* ... 설정창 */}
        {
          <OpenOption
            calculateOptionsModalPosition={calculateOptionsModalPosition}
          />
        }

        {/* ...설정창 펼치기 */}
        {isOptionsModalOpen && (
          <EditProfile
            top={optionsModalPosition.top}
            left={optionsModalPosition.left}
            openEditModal={openEditModal}
            closeOptionsModalOpen={closeOptionsModal}
          />
        )}

        {/* 프로필 수정 모달 펼치기 */}
        {isEditModalOpen && <AdminEditModal onClose={closeEditModal} />}


        {/* 프로필 이미지 */}
        <div className=" flex items-center flex-col z-10">

          <UserProfileImage userProfileImage={userData?.profileImageUrl} />
        </div>


        <UserProfileInfo
          username={userData?.username}
          introText={userData?.introduction} />

        {playlistData && playlistData.map((playlist: getPlaylistDTO, index: number) => (
          <PlayList
            playlist={playlist} />
        ))}

        {!isLoading && playlistData?.length && playlistData.length < 4 ?
          <AddPlayList />
          :
          <></>
        }
      </div>
    </div>
  );
};

export default AdminPage;
