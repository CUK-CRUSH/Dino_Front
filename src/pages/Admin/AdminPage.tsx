import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // Import the useDispatch hook
import { selectImage } from "@reducer/imageSlice";
import { RootState } from "@store/index";
import AdminEditModal from "./AdminEditModal";

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const selectedImage = useSelector((state: RootState) => state.image.selectedImage);
  const dispatch = useDispatch(); // Initialize dispatch

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

  const [isOptionsModalOpen, setOptionsModalOpen] = useState(false);

  const openOptionsModal = () => {
    setOptionsModalOpen(true);
  };
  
  const closeOptionsModal = () => {
    setOptionsModalOpen(false);
  };

  const [optionsModalPosition, setOptionsModalPosition] = useState({ top: 0, left: 0 });

const calculateOptionsModalPosition = (e: { target: any; }) => {
  const button = e.target;
  const rect = button.getBoundingClientRect();

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


    <div className="w-[390px] h-[844px] relative bg-white">
        <div className="w-[390px] h-[677px] left-0 top-[167px] absolute bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" />
        <div className="w-[75px] h-[75px] left-[158px] top-[130px] absolute bg-gray-200 rounded-full" />
        <div className="w-[100px] h-5 left-[145px] top-[224px] absolute text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px]">meow</div>
        <div className="left-[68px] top-[58px] absolute">
            <div className="left-0 top-[35px] absolute text-center text-neutral-400 text-[15px] font-medium font-['Noto Sans'] leading-[18px]">Please upload a background photo!</div>
            <div className="w-[29px] h-[29px] left-[113px] top-0 absolute flex-col justify-start items-start inline-flex" />
        </div>
        <div className="left-[150px] top-[263px] absolute text-center text-white text-[15px] font-medium font-['Noto Sans'] leading-[18px]">introduction</div>
        <div className="w-[22px] h-1 left-[352px] top-[193px] absolute">
            <div className="w-1 h-1 left-0 top-0 absolute bg-white rounded-full" />
            <div className="w-1 h-1 left-[9px] top-0 absolute bg-white rounded-full" />
            <div className="w-1 h-1 left-[18px] top-0 absolute bg-white rounded-full" />
        </div>
        <div className="w-[52.60px] h-[59px] left-[169.20px] top-[146px] absolute">
            <div className="w-[21px] h-[21px] left-[15.80px] top-0 absolute bg-neutral-400 rounded-full" />
            <img className="w-[52.60px] h-[34px] left-0 top-[25px] absolute" src="https://via.placeholder.com/53x34" />
        </div>
        <div className="w-[169px] h-[169px] left-[16px] top-[323px] absolute">
            <div className="w-[169px] h-[169px] left-0 top-0 absolute rounded-[13px] border-2 border-zinc-300" />
            <div className="left-[44px] top-[124px] absolute text-center text-zinc-300 text-[13px] font-medium font-['Noto Sans'] leading-[18px]">New PlayList</div>
            <div className="w-[55px] h-[55px] left-[55px] top-[48px] absolute">
            </div>
        </div>
    </div>


  return (
    <div className="w-[390px] h-[844px] relative bg-white">
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
          <p className="text-gray text-center">Please upload a background photo!</p>
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

      {/* Username and introductory text section */}
        <div className="w-[390px] h-[677px] bg-neutral-900 rounded-tl-[30px] rounded-tr-[30px]" >

  <button
    onClick={(e) => calculateOptionsModalPosition(e)}
    className="px-[16px] py-[26px] bg-black-500 text-white font-bold"
  >
      <div className="w-[22px] h-1 relative">
          <div className="w-1 h-1 left-0 top-0 absolute bg-white rounded-full" />
          <div className="w-1 h-1 left-[9px] top-0 absolute bg-white rounded-full" />
          <div className="w-1 h-1 left-[18px] top-0 absolute bg-white rounded-full" />
      </div>
  </button>


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

        <div className="mb-0 flex items-center flex-col">
          {/* User Profile Icon and Username */}
          <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gradient-to-tr from-blue-500 via-green-500 to-yellow-500">
          <img
  src={userProfile?.userProfileImage ?? "default-image-url.jpg"}
  alt="User Profile"
  className="w-full h-full object-cover"
/>
          </div>

          <h2 className="text-1xl font-bold">{username}</h2>
        </div>

        <p className="text-lg2 font-light">{introText}</p>

      <button className="w-[140px] h-[140px] rounded-[13px] border-2 border-zinc-300 font-light text-zinc-300 text-4xl mt-5 ml-10">
        +
        <div className="text-sm mt-2">Add New Playlist</div>
      </button>
    </div>
    </div>
  );
};

export default AdminPage;
// function dispatch(arg0: {
//   // Load user profile data from the Redux store on component mount
//   payload: any; type: "image/selectImage";
// }) {
//   throw new Error("Function not implemented.");
// }

