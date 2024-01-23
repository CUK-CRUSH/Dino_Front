import React, { useEffect, useState } from "react";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { AddPlayList } from "@components/Admin/Button/AddPLayList";
import { EditProfile } from "@components/Admin/Modal/EditProfile";
import UserProfileBackground from "./UserProfileBackgroundImage";
import OpenOption from "./Button/OpenOption";
import UserProfileImage from "./UserProfileImage";
import UserProfileInfo from "./UserProfileInfo";
// import { PlayList } from "@components/Admin/Button/PlayList";
import { getMember } from "@api/member-controller/memberController";
import { useCookies } from "react-cookie";
import useDecodedJWT from "@hooks/useDecodedJWT";
import { getMemberDTO, getPlaylistDTO } from "types/Admin";
import { getPlayList } from "@api/playlist-controller/playlistControl";
import { useParams } from "react-router-dom";
import { PlayList } from "./Button/PlayList";

const AdminPage: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [cookies] = useCookies();
  // 액세스 토큰
  const token = cookies.accessToken;

  const decodedToken = useDecodedJWT(token);

  // 유저데이터
  const [userData, setUserdata] = useState<getMemberDTO>();

  // 플레이리스트 데이터
  const [playlistData, setPlaylistdata] = useState<getPlaylistDTO[]>([]);

  const {username} = useParams<{username : string | undefined}>();
  // 정보불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 유저 정보 조회
        const userDataResult = await getMember(
          decodedToken.sub,
          cookies.accessToken
        );
        setUserdata(userDataResult.data);

        // 유저 - 플레이리스트 조회
        const playlistDataResult = await getPlayList(
          username
        );
        setPlaylistdata(playlistDataResult.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle errors appropriately
      }
    };

    // Call the asynchronous function inside useEffect
    fetchData();
  }, [decodedToken.sub, cookies.accessToken, userData]);

  // 유저 프로필 불러오기
  // const userProfile = useSelector((state: RootState) => state.userProfile);

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

  return (
    <div className=" h-full w-full relative bg-white">
      <UserProfileBackground
        userBackgroundImage={userData?.backgroundImageUrl}
      />

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

          <UserProfileInfo
            username={userData?.username}
            introText={userData?.introduction}
          />
        </div>

        {/* 내가 생성한 플레이리스트 뽑아주고 마지막에 플레이리스트 추가 컴포넌트 붙이기. */}

        {<AddPlayList />}
        {playlistData && playlistData.map((playlist : getPlaylistDTO, index : number) => (
            <PlayList 
              playlist={playlist}/>
        ))}       

      </div>
    </div>
  );
};

export default AdminPage;
