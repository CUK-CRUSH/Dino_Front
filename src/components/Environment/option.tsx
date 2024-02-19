import { getMemberUsername } from "@api/member-controller/memberController";
import { useCallback, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import { getMemberDTO } from "types/Admin";
import NoImage from "@assets/noimage.jpg";
import AdminEditModal from "@pages/Admin/AdminEditModal";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

const OptionComponents = () => {
  const getDefaultMember = (): getMemberDTO => ({
    backgroundImageUrl: null,
    id: undefined,
    introduction: "",
    name: undefined,
    oauth2id: undefined,
    profileImageUrl: null,
    username: "",
  });

  const navigate = useNavigate();
  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const [userData, setUserdata] = useState<getMemberDTO>(getDefaultMember);
  const [isLoading, setIsLoding] = useState<boolean>(true);

  const { username } = useParams<{ username: string | undefined }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataResult = await getMemberUsername(username);

        setUserdata(userDataResult.data);
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const profileImage = useSelector((state: RootState) => state.userProfile);

  return (
    <div className="h-full w-full scrollbar-hide overflow-scroll flex flex-col bg-white text-black font-medium leading-[18px]">
      <header className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px] border-b-[1px] border-[#EFEFEF]">
        <button
          type="button"
          onClick={handleBack}
          className="text-white self-start mt-2"
        >
          <FaAngleLeft size={24} color="black" />
        </button>
      </header>
      {!isLoading && (
        <main className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <img
              src={
                profileImage?.profileImage
                  ? profileImage?.profileImage
                  : userData.profileImage
                  ? userData.profileImage
                  : userData.profileImageUrl
                  ? userData.profileImageUrl
                  : NoImage
              }
              alt="프로필 이미지"
              className="w-14 h-14 rounded-full"
            />
            <div className="ml-4">
              <h2 className="text-lg font-bold">{userData.username}</h2>
              <p className="text-sm text-gray-500">{userData.introduction}</p>
            </div>
          </div>
          <button
            onClick={openEditModal} /* 프로필 바로가기 기능 구현 */
            className="px-4 py-2 text-sm bg-black text-white rounded-2xl"
          >
            프로필 수정
          </button>
        </main>
      )}

      {isEditModalOpen && <AdminEditModal onClose={closeEditModal} />}
    </div>
  );
};

export default OptionComponents;
