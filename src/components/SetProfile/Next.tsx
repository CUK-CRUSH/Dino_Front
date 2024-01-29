import { updateMember } from "@api/member-controller/memberController";
import { RootState } from "@store/index";
import { checkData } from "@utils/checkData/checkData";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateMemberParams } from "types/AdminEdit";
import { NextDTO, checkDataItem } from "types/SetProfile/setProfile";

const Next = ({ step,username}: NextDTO) => {
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
    // Handle member data
    console.log("Saving data:", data);

    if(step === 3) { 
      const code = await updateMember(data);
      if(code.status === 200) {
        console.log(code)
        setTimeout(async () => {
          navigate(`/${code.data.username}/admin`)
        }, 1000);  
        
      }
    }
  
  };
  
  const checkDataItem : checkDataItem[] = [
    { key: 1, value: profileImage },
    { key: 2, value: profileBackgroundImage },
    { key: 3, value: profileIntroduction },
  ];
  console.log(checkData(checkDataItem,step))
  return (
    <Link to={`/SetProfile/${username}/${step + 1}`}>
      {checkData(checkDataItem,step) ? 
      <div onClick={()=>handleMember(updateMemberData)} className="absolute bottom-0 -left-0 p-4 w-full bg-[#000] text-white flex items-center justify-center overflow-hidden">
        계속하기
      </div>
      :
      <div onClick={()=>handleMember(updateMemberData)} className="absolute bottom-0 -left-0 p-4 w-full bg-[#b6b6b6] text-white flex items-center justify-center overflow-hidden">
        계속하기
      </div>
      }
      
    </Link>
  );
};

export default Next;