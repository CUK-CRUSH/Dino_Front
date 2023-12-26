import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import the useDispatch hook
import { selectImage } from "@reducer/imageSlice";
import { RootState } from "@store/index";
import AdminEditModal from "./AdminEditModal";
import Layout from "@components/Layout/layout";

interface AdminPageProps { }

const AdminPage: React.FC<AdminPageProps> = () => {
  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);
  const dispatch = useDispatch(); // Initialize dispatch

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Local state to manage the modal

  // State for username and introductory text
  const [username, setUsername] = useState("ㄴㄴㄴ");
  const [introText, setIntroText] = useState("ㅁㄴㅇㄴㅁㅇㄴㅁㅇ  ");

  // Load user profile data from the Redux store on component mount
  const userProfile = useSelector((state: RootState) => state.userProfile);

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalOpen(true);
  };

  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  const [optionsModalPosition, setOptionsModalPosition] = useState({ top: 0, left: 0 });

  // 옵션모달 열리는 창 위치
  const calculateOptionsModalPosition = (e: { target: any; }) => {
    const button = e.target;
    const rect = button.getBoundingClientRect();
    console.log(rect)
    setOptionsModalPosition({
      top: rect.top + rect.height + window.scrollY,
      left: rect.left + window.scrollX - 120,
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


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Save the selected image to Redux store
      dispatch(selectImage(URL.createObjectURL(file)));
    }
  };

  return (
    <Layout>
      <div className=" h-full w-full relative bg-white">
        {/* 배경사진 변경 */}
        <div
          className="h-1/4 rounded-b-3xl bg-white"
          onClick={() => document.getElementById("imageInput")?.click()}
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              className="h-full w-full rounded-b-3xl flex justify-center items-center"
            />
          ) : (
            <>
              <div className={"pt-[58px] flex justify-center items-center"}>
                <svg width="29px" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M24.4688 4.75781H4.53125C4.11063 4.75781 3.70724 4.9249 3.40982 5.22232C3.1124 5.51974 2.94531 5.92313 2.94531 6.34375V22.6562C2.94531 23.0769 3.1124 23.4803 3.40982 23.7777C3.70724 24.0751 4.11063 24.2422 4.53125 24.2422H24.4688C24.8894 24.2422 25.2928 24.0751 25.5902 23.7777C25.8876 23.4803 26.0547 23.0769 26.0547 22.6562V6.34375C26.0547 5.92313 25.8876 5.51974 25.5902 5.22232C25.2928 4.9249 24.8894 4.75781 24.4688 4.75781ZM4.53125 6.11719H24.4688C24.5288 6.11719 24.5865 6.14106 24.629 6.18355C24.6714 6.22603 24.6953 6.28366 24.6953 6.34375V18.5294L21.3569 15.191C21.2096 15.0437 21.0348 14.9269 20.8424 14.8472C20.65 14.7675 20.4437 14.7264 20.2354 14.7264C20.0271 14.7264 19.8209 14.7675 19.6285 14.8472C19.4361 14.9269 19.2612 15.0437 19.1139 15.191L16.6875 17.6175L11.5434 12.4723C11.3961 12.325 11.2212 12.2081 11.0288 12.1284C10.8364 12.0487 10.6302 12.0077 10.4219 12.0077C10.2136 12.0077 10.0074 12.0487 9.81493 12.1284C9.6225 12.2081 9.44766 12.325 9.30039 12.4723L4.30469 17.468V6.34375C4.30469 6.28366 4.32856 6.22603 4.37105 6.18355C4.41353 6.14106 4.47116 6.11719 4.53125 6.11719ZM4.30469 22.6562V19.3904L10.261 13.434C10.2821 13.4128 10.3071 13.3959 10.3347 13.3844C10.3624 13.3729 10.392 13.367 10.4219 13.367C10.4518 13.367 10.4814 13.3729 10.509 13.3844C10.5366 13.3959 10.5617 13.4128 10.5827 13.434L20.0315 22.8828H4.53125C4.47116 22.8828 4.41353 22.8589 4.37105 22.8165C4.32856 22.774 4.30469 22.7163 4.30469 22.6562ZM24.4688 22.8828H21.9539L17.6492 18.5781L20.0746 16.1516C20.0956 16.1306 20.1206 16.1139 20.1481 16.1025C20.1756 16.0911 20.2051 16.0852 20.2349 16.0852C20.2646 16.0852 20.2941 16.0911 20.3216 16.1025C20.3491 16.1139 20.3741 16.1306 20.3952 16.1516L24.6998 20.4563V22.6562C24.6998 22.6864 24.6938 22.7162 24.6822 22.744C24.6705 22.7718 24.6534 22.797 24.6319 22.8181C24.6104 22.8392 24.5849 22.8558 24.5568 22.8669C24.5288 22.878 24.4989 22.8834 24.4688 22.8828ZM16.5391 11.3281C16.5391 11.1041 16.6055 10.8851 16.73 10.6988C16.8545 10.5125 17.0314 10.3673 17.2384 10.2815C17.4454 10.1958 17.6731 10.1734 17.8929 10.2171C18.1126 10.2608 18.3145 10.3687 18.4729 10.5271C18.6313 10.6855 18.7392 10.8874 18.7829 11.1071C18.8266 11.3269 18.8042 11.5546 18.7185 11.7616C18.6327 11.9686 18.4875 12.1455 18.3012 12.27C18.1149 12.3945 17.8959 12.4609 17.6719 12.4609C17.3714 12.4609 17.0833 12.3416 16.8709 12.1291C16.6584 11.9167 16.5391 11.6286 16.5391 11.3281Z"
                    fill="#8E8E8E" />
                </svg></div>
              <div className="text-center text-neutral-400 text-[15px] font-medium font-['Noto Sans'] leading-[18px] pt-[6px]">Please
                upload a background photo!</div></>
          )}
        </div>
        <input
          type="file"
          id="imageInput"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageChange}
        />

        {/* {isAddMusicModalOpen && (
        <AddMusic onClose={() => handleCloseAddMusicModal()} />
      )} */}

        {/* 프로필 & 플레이리스트 화면 */}
        <div className="h-full w-full left-0 top-[167px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" >

          {/* 옵션 */}
          <div className={"w-[22px] h-30 left-[300px] top-[15px] absolute"}>
            <button
              onClick={(e) => calculateOptionsModalPosition(e)}
            >
              <div className="w-[22px] h-1 relative">
                <div className="w-1 h-1 left-0 top-0 absolute bg-white rounded-full" />
                <div className="w-1 h-1 left-[9px] top-0 absolute bg-white rounded-full" />
                <div className="w-1 h-1 left-[18px] top-0 absolute bg-white rounded-full" />
              </div>
            </button>
            </div>

          {/* 옵션모달 */}
          {isOptionsModalOpen && (
            <div
              className="fixed"
              style={{ top: optionsModalPosition.top, left: optionsModalPosition.left }}
            >
              <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
              <div className="relative w-40 p-0 bg-white rounded-lg shadow-lg">

                <button onClick={closeOptionsModal} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
                <div className="p-1">
                  <div
                    className="block text-black hover:bg-gray-300 p-2 w-full text-left cursor-pointer"
                    onClick={openEditModal}
                  >
                    Edit Profile
                  </div>
                  <button className="block text-black hover:bg-gray-300 p-2 w-full text-left">Copy link</button>
                </div>
              </div>
            </div>
          )}

          {/* 프로필 수정 모달창 */}
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
  
          {/* 유저 프로필 */}
          <div className=" flex items-center flex-col z-40">
            {/* User Profile Icon and Username */}
            <div className="w-[75px] h-[75px] mt-[15px] rounded-full overflow-hidden ">
              <img
                src={userProfile?.userProfileImage ?? "default-image-url.jpg"}
                alt="User Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-[250px] text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px] mt-[19px]">
              {username}
            </div>
            <div className="text-center mt-[19px] text-white text-[15px] font-medium font-['Noto Sans'] leading-[18px]">
              {introText}
            </div>
          </div>
          
          <button className="w-[150px] h-[150px] rounded-[13px] border-2 border-zinc-300 font-light text-zinc-300 text-4xl ml-[16px] mt-[42px]">
            +
            <div className="text-center text-zinc-300 text-[13px] font-medium font-['Noto Sans'] leading-[18px]">New PlayList</div>
          </button>
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

