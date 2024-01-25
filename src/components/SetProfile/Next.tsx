import { updateMember } from "@api/member-controller/memberController";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { UpdateMemberParams } from "types/AdminEdit";
import { NextDTO } from "types/SetProfile/setProfile";

const Next = ({ step,username,profileImage,profileBackgroundImage,profileIntroduction}: NextDTO) => {

  const navigate = useNavigate();

  const [cookie] = useCookies();
  const token = cookie.accessToken;

  const [updateMemberData] = useState<UpdateMemberParams>({
    username: username,
    introduction: profileIntroduction,
    profileImage: profileImage,
    backgroundImage: profileBackgroundImage,
    cookies: token,
  });

  const handleMember = (data: UpdateMemberParams) => {
    // Handle member data
    console.log("Saving data:", data);

    if(step ==3) { 
      updateMember(data); 
      navigate(`/${username}/admin`)
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