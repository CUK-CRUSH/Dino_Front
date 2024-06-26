import { updateMember } from "@api/member-controller/memberController";
import useWindowSizeCustom from "@hooks/useCustomMargin/useWindowSizeCustom";
import { RootState } from "@store/index";
import { checkData } from "@utils/checkData/checkData";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateMemberParams } from "types/AdminEdit";
import { NextDTO, checkDataItem } from "types/SetProfile/setProfile";

const Next = ({ step, username }: NextDTO) => {
  const navigate = useNavigate();

  const [cookie] = useCookies();
  const token = cookie.accessToken;

  const { profileImage, profileBackgroundImage, profileIntroduction } = useSelector(
    (state: RootState) => state.setProfile
  );
  const updateMemberData: UpdateMemberParams = {
    username: undefined,
    introduction: profileIntroduction,
    profileImage: profileImage,
    backgroundImage: profileBackgroundImage,
    cookies: token,
  }


  const handleMember = async (data: UpdateMemberParams) => {
    if (step === 3) {
      const code = await updateMember(data);

      if (code.status === 200) {
        setTimeout(async () => {
          navigate(`/user/${code.data.username}`)
        }, 1000);

      }
    }

  };

  const checkDataItem: checkDataItem[] = [
    { key: 1, value: profileImage },
    { key: 2, value: profileBackgroundImage },
    { key: 3, value: profileIntroduction },
  ];

  const {isMobile} = useWindowSizeCustom();

  return (
    <Link to={`/SetProfile/${username}/${step + 1}`}>
      <div
        onClick={() => handleMember(updateMemberData)}
        className={`${!isMobile ? "absolute " : "fixed "} bottom-0 -left-0 
                      p-4 w-full text-white flex items-center justify-center overflow-hidden 
                      ${checkData(checkDataItem, step) ? "bg-[#000]" : "bg-[#b6b6b6]"
          }`}
      >
        계속하기
      </div>
    </Link>
  );
};

export default Next;