import { updateMember } from "@api/member-controller/memberController";
import { RootState } from "@store/index";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateMemberParams } from "types/AdminEdit";
import { NextDTO } from "types/SetProfile/setProfile";

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

      await new Promise(resolve => setTimeout(resolve, 700));

      const code = await updateMember(data);
      if(code.status === 200) {
        console.log(code)
        navigate(`/${code.data.username}/admin`)
      }
    }
  
  };

  return (
    <Link to={`/SetProfile/${username}/${step + 1}`}>

      <div onClick={()=>handleMember(updateMemberData)} style={{ background: "#B6B6B6" }} className="absolute bottom-0 -left-0 p-4 w-full bg-slate-200 text-white flex items-center justify-center overflow-hidden">
        계속하기
      </div>
    </Link>
  );
};

export default Next;