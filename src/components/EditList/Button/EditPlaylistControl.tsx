import { notify } from "@utils/toast/toast";
import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  tutorialStep,
}: EditPlayListControlsDTO) => {
  return (
    <div
      className={`flex min-h-[4%]  items-center justify-between m-3 text-[19px] `}
    >
      {isEditing ? (
        <>
          <div
            className={`${
              tutorialStep === "list1" ? "pointer-events-none" : ""
            }`}
          >
            <button className={`text-red-500 `} onClick={onCancel}>
              취소
            </button>
          </div>
          <div>
            <p className="text-center">플레이리스트</p>
          </div>
          <div
            className={`${
              tutorialStep === "list1" ? "pointer-events-none" : ""
            }`}
          >
           <button onClick={() => { onSave(); notify('플레이리스트가 수정되었습니다 ', 'white'); }}>저장</button>

          </div>
          {tutorialStep === "list1" && (
            <>
              <div className="absolute text-[16px] w-[300px] h-[80px] top-14 right-3 mt-1 z-20 bg-white text-black p-2 rounded-md font-bold flex items-center justify-center">
                <div className="text-start">
                  <p className="mb-1">플레이리스트를 수정한 후에는</p>
                  <p>꼭 '저장'을 눌러 수정사항을 저장해주세요.</p>
                </div>
              </div>
              <div className="w-6 h-6 bg-white absolute top-[50px] right-7 z-[19] transform rotate-45"></div>
            </>
          )}
        </>
      ) : (
        // 이 부분이 모달입니다 ㅋㅋㅋㅋㅋㅋ
        <div className="ml-auto font-bold text-[13px] space-y-3">
          <button
            className="w-full border-b-[1px] border-[#D9D9D9]"
            onClick={onEdit}
          >
            곡추가 / 리스트 수정
          </button>

          <button className="w-full text-red-600 font-bold" onClick={onDelete}>
            리스트 삭제
          </button>
        </div>
      )}
    </div>
  );
};
