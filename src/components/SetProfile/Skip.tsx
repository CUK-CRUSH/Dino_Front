import { updateMember } from "@api/member-controller/memberController";
import { setProfileBackgroundImage, setProfileImage, setProfileIntroduction } from "@reducer/setProfile/setProfile";
import { RootState } from "@store/index";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UpdateMemberParams } from "types/AdminEdit";
import { SkipDTO } from "types/SetProfile/setProfile";

const Skip = ({ step,username }: SkipDTO) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        navigate(`/user/${code.data.username}`)
      }
    }
  
  };
  
  useEffect(() => {
    if (step >= 4) { navigate(`/user/${username}`); }
  }, [step,navigate,username])

  const handleClick = () => {
    if(step === 1) {dispatch(setProfileImage(undefined))}
    if(step === 2) {dispatch(setProfileBackgroundImage(undefined))}
    if(step === 3) {dispatch(setProfileIntroduction(undefined))
                    handleMember(updateMemberData)}
  }

  return (
    <Link to={`/SetProfile/${username}/${step + 1}`}>
      <div onClick={handleClick} style={{ position: 'absolute', top: 20, right: 20, color: '#B6B6B6' }} className={""}>
        건너뛰기
      </div>
    </Link>
  );
};

export default Skip;