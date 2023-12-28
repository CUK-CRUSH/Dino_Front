import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import the useDispatch hook
import { RootState } from "@store/index";
import AdminEditModal from "./AdminEditModal";
import Layout from "@components/Layout/layout";
import { AddPalyList } from "@components/Admin/AddPLayList";
import { EditProfile } from "@components/Admin/EditProfile";

interface AdminPageProps { }

const AdminPage: React.FC<AdminPageProps> = () => {
  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Local state to manage the modal

  // State for username and introductory text
  const [username, setUsername] = useState("");
  const [introText, setIntroText] = useState("");

  // Load user profile data from the Redux store on component mount
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  // 옵션 모달 열기 이벤트
  const [optionsModalPosition, setOptionsModalPosition] = useState<{ top: number, left: number }>({ top: 0, left: 0 });

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };
  // 옵션모달 열리는 창 위치
  const calculateOptionsModalPosition = (e: { target: any; }) => {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    console.log(rect)
    setOptionsModalPosition({
      top: rect.top + rect.height,
      left: rect.left - 160 + rect.width,


    });

    openOptionsModal();
  };

  useEffect(() => {
    // Update the state with user profile data when it's available
    if (userProfile) {
      setUsername(userProfile.username);
      setIntroText(userProfile.introText);
    }
  }, [userProfile]);

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setIntroText(userProfile.introText);
    }
  }, [userProfile]);


  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     // Save the selected image to Redux store
  //     dispatch(selectImage(URL.createObjectURL(file)));
  //   }
  // };

  return (
    <Layout>
      <div className=" h-full w-full relative bg-white">
        <div
          className="h-1/4 rounded-b-3xl bg-white"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="h-full w-full rounded-b-3xl flex justify-center items-center"
            />
          ) : (
            <>
            </>
          )}
        </div>
        {/* {isAddMusicModalOpen && (
        <AddMusic onClose={() => handleCloseAddMusicModal()} />
      )} */}

        {/* Username and introductory text section */}
        <div className="h-full w-full left-0 top-[167px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" >
          {/* ... 설정창 */}
          <div className={"w-[22px] right-[20px] top-[0px] absolute "}>
            <button
              className=" text-white text-3xl font-bold tracking-wider "
              onClick={(e) => calculateOptionsModalPosition(e)}
            >...
            </button>
          </div>

          {isOptionsModalOpen && (
            <EditProfile 
              top={optionsModalPosition.top}
              left={optionsModalPosition.left}
              openEditModal={openEditModal}
              closeOptionsModalOpen={closeOptionsModal} />
          )}

          {isEditModalOpen && (
            <AdminEditModal onClose={closeEditModal} />
          )}

          {/* <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Link to="/admin/edit">
          <button className="px-3 py-1 bg-black-500 text-white font-bold">
            · · ·
          </button>
        </Link>
      </div> 다른 페이지로 Edit 열기 */}

          <div className=" flex items-center flex-col z-40">
            {/* User Profile Icon and Username */}
            <div className="w-[75px] h-[75px] mt-[-35px] rounded-full overflow-hidden ">
              <img
                src={userProfile?.userProfileImage ?? "default-image-url.jpg"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[250px] text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px] mt-[19px]">{username}</div>
            <div className="text-center mt-[19px] text-white text-[15px] font-medium font-['Noto Sans'] leading-[18px]">{introText}</div>
          </div>



          <AddPalyList />
          <AddPalyList />

        </div>
      </div>
    </Layout>
  );
};

export default AdminPage;
// function dispatch(arg0: {
//   // Load user profile data from the Redux store on component mount
//   payload: any; type: "image/selectImage";
// }) {
//   throw new Error("Function not implemented.");
// }

