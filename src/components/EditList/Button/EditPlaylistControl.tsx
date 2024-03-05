import { EditPlayListControlsDTO } from "types/EditplayList";

export const EditPlaylistControls = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: EditPlayListControlsDTO) => {
  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
      {isEditing ? (
        <>
          <div>
            <button className="text-red-500" onClick={onCancel}>
              취소
            </button>
          </div>
          <div>
            <p className="text-center">플레이리스트</p>
          </div>
          <div>
            <button onClick={onSave}>저장</button>
          </div>
        </>
      ) : (
        // 이 부분이 모달입니다 ㅋㅋㅋㅋㅋㅋ
        <div className="ml-auto text-[18px] space-y-3">
          <button
            className="w-full border-b-[1px] border-[#D9D9D9]"
            onClick={onEdit}
          >
            수정하기
          </button>

          <button
            className="w-full text-[13px] text-red-600 font-bold"
            onClick={onDelete}
          >
            제거하기
          </button>
        </div>
      )}
    </div>
  );
};
