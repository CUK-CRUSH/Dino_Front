import React, { useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { selectImage } from "@reducer/imageSlice";
import { updateArtist, updateTitle, updateURL } from "@reducer/musicadd";
import { RootState } from "@store/index";
import AddMusic from "@components/Addmusic/addMusic";

interface EditPlsyListProps {}

const EditPlsyList: React.FC<EditPlsyListProps> = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddMusicModalOpen, setIsAddMusicModalOpen] = useState(false);
  const selectedImage = useSelector(
    (state: RootState) => state.image.selectedImage
  );
  const musicData = useSelector((state: RootState) => state.musicAdd);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // 추가적으로 저장할 수 있는 기능을 넣는다.
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    dispatch(updateTitle(""));
    dispatch(updateArtist(""));
    dispatch(updateURL(""));
    setIsEditing(false);
  };

  const handleAddMusicClick = () => {
    setIsAddMusicModalOpen(true);
  };

  const handleCloseAddMusicModal = () => {
    setIsAddMusicModalOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 이미지를 Redux store에 선택한 이미지로 저장
      dispatch(selectImage(URL.createObjectURL(file)));
    }
  };

  return (
    <div className="z-30 h-full w-full flex flex-col bg-black text-white">
      <div
        className="h-1/3 rounded-b-3xl bg-white"
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
            <div className={"pt-[110px] flex justify-center items-center"}>
              <svg
                width="29px"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.4688 4.75781H4.53125C4.11063 4.75781 3.70724 4.9249 3.40982 5.22232C3.1124 5.51974 2.94531 5.92313 2.94531 6.34375V22.6562C2.94531 23.0769 3.1124 23.4803 3.40982 23.7777C3.70724 24.0751 4.11063 24.2422 4.53125 24.2422H24.4688C24.8894 24.2422 25.2928 24.0751 25.5902 23.7777C25.8876 23.4803 26.0547 23.0769 26.0547 22.6562V6.34375C26.0547 5.92313 25.8876 5.51974 25.5902 5.22232C25.2928 4.9249 24.8894 4.75781 24.4688 4.75781ZM4.53125 6.11719H24.4688C24.5288 6.11719 24.5865 6.14106 24.629 6.18355C24.6714 6.22603 24.6953 6.28366 24.6953 6.34375V18.5294L21.3569 15.191C21.2096 15.0437 21.0348 14.9269 20.8424 14.8472C20.65 14.7675 20.4437 14.7264 20.2354 14.7264C20.0271 14.7264 19.8209 14.7675 19.6285 14.8472C19.4361 14.9269 19.2612 15.0437 19.1139 15.191L16.6875 17.6175L11.5434 12.4723C11.3961 12.325 11.2212 12.2081 11.0288 12.1284C10.8364 12.0487 10.6302 12.0077 10.4219 12.0077C10.2136 12.0077 10.0074 12.0487 9.81493 12.1284C9.6225 12.2081 9.44766 12.325 9.30039 12.4723L4.30469 17.468V6.34375C4.30469 6.28366 4.32856 6.22603 4.37105 6.18355C4.41353 6.14106 4.47116 6.11719 4.53125 6.11719ZM4.30469 22.6562V19.3904L10.261 13.434C10.2821 13.4128 10.3071 13.3959 10.3347 13.3844C10.3624 13.3729 10.392 13.367 10.4219 13.367C10.4518 13.367 10.4814 13.3729 10.509 13.3844C10.5366 13.3959 10.5617 13.4128 10.5827 13.434L20.0315 22.8828H4.53125C4.47116 22.8828 4.41353 22.8589 4.37105 22.8165C4.32856 22.774 4.30469 22.7163 4.30469 22.6562ZM24.4688 22.8828H21.9539L17.6492 18.5781L20.0746 16.1516C20.0956 16.1306 20.1206 16.1139 20.1481 16.1025C20.1756 16.0911 20.2051 16.0852 20.2349 16.0852C20.2646 16.0852 20.2941 16.0911 20.3216 16.1025C20.3491 16.1139 20.3741 16.1306 20.3952 16.1516L24.6998 20.4563V22.6562C24.6998 22.6864 24.6938 22.7162 24.6822 22.744C24.6705 22.7718 24.6534 22.797 24.6319 22.8181C24.6104 22.8392 24.5849 22.8558 24.5568 22.8669C24.5288 22.878 24.4989 22.8834 24.4688 22.8828ZM16.5391 11.3281C16.5391 11.1041 16.6055 10.8851 16.73 10.6988C16.8545 10.5125 17.0314 10.3673 17.2384 10.2815C17.4454 10.1958 17.6731 10.1734 17.8929 10.2171C18.1126 10.2608 18.3145 10.3687 18.4729 10.5271C18.6313 10.6855 18.7392 10.8874 18.7829 11.1071C18.8266 11.3269 18.8042 11.5546 18.7185 11.7616C18.6327 11.9686 18.4875 12.1455 18.3012 12.27C18.1149 12.3945 17.8959 12.4609 17.6719 12.4609C17.3714 12.4609 17.0833 12.3416 16.8709 12.1291C16.6584 11.9167 16.5391 11.6286 16.5391 11.3281Z"
                  fill="#8E8E8E"
                />
              </svg>
            </div>
            <div className="text-center text-neutral-400 text-[15px] font-medium font-['Noto Sans'] leading-[18px] pt-[6px]">
              Setting a representative image
            </div>
          </>
        )}
      </div>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <div className="h-2/3">
        {isEditing ? (
          <div>
            s
            <div className="flex justify-between m-2">
              <button className="text-red-500" onClick={handleCancelClick}>
                Cancel
              </button>
              <button onClick={handleSaveClick}>Save</button>
            </div>
            <div className="w-full text-lg mt-10 flex flex-col justify-around">
              <div className="flex flex-row justify-around pb-2 mx-5 border-b border-white">
                <div className="flex flex-row items-center mr-20">
                  <h3 className="mr-10">1</h3>
                  <h3>{musicData.title}</h3>
                </div>
                <div className="flex flex-row items-center ml-20">
                  <h3 className="mr-2">{musicData.artist}</h3>
                  <button className="ml-10">▶️</button>
                </div>
              </div>
            </div>
            <div className="absolute right-1 bottom-1">
              <button onClick={handleAddMusicClick}>
                <AiFillPlusCircle size={56} color="white" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-end m-2">
              <button onClick={handleEditClick}>Edit</button>
            </div>
            {/* 나중에 maping해서 데이터 보여주기 */}

            <div className="w-full text-lg mt-10 flex flex-col justify-around">
              <div className="flex flex-row justify-around pb-2 mx-5 border-b border-white">
                <div className="flex flex-row items-center mr-20">
                  <h3 className="mr-10">1</h3>
                  <a href={musicData.url}>
                    <h3>{musicData.title}</h3>
                  </a>
                </div>
                <div className="flex flex-row items-center ml-20">
                  <h3 className="mr-2">{musicData.artist}</h3>
                  <button className="ml-10">▶️</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isAddMusicModalOpen && (
        <AddMusic onClose={() => handleCloseAddMusicModal()} />
      )}
    </div>
  );
};

export default EditPlsyList;