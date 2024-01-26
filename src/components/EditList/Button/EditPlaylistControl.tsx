import { EditPlayListControlsDTO } from "types/EditplayList";
import { useTranslation } from "react-i18next";

export const EditPlaylistControls: React.FC<EditPlayListControlsDTO> = ({
  isEditing,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation("Edit");
  return (
    <div className="flex h-[5%] smartPhoneXs:h-[3.5%] smartPhone:h-[3.5%] tabletMini:h-[3%] tablet:h-[3%] items-center justify-between m-3 text-[19px]">
      {isEditing ? (
        <>
          <div>
            <button className="text-red-500" onClick={onCancel}>
              {t("cancle")}
            </button>
          </div>
          <div>
            <p className="text-center">플레이리스트</p>
          </div>
          <div>
            <button onClick={onSave}>{t("save")}</button>
          </div>
        </>
      ) : (
        // 이 부분이 모달입니다 ㅋㅋㅋㅋㅋㅋ
        <div className="ml-auto text-[18px] space-y-2">
          <button
            className="w-full border-b-[1px] border-[#D9D9D9]"
            onClick={onEdit}
          >
            {t("list_edit")}
          </button>

          <button className="w-full" onClick={onDelete}>
            {t("delete_music")}
          </button>
        </div>
      )}
    </div>
  );
};
