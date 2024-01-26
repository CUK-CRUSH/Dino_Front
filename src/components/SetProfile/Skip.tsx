import { setProfileBackgroundImage, setProfileImage, setProfileIntroduction } from "@reducer/setProfile/setProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SkipDTO } from "types/SetProfile/setProfile";

const Skip = ({ step,username }: SkipDTO) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (step >= 4) { navigate(`/${username}/admin`); }
  }, [step,navigate,username])

  const handleClick = () => {
    if(step === 1) {dispatch(setProfileImage(undefined))}
    if(step === 2) {dispatch(setProfileBackgroundImage(undefined))}
    if(step === 3) {dispatch(setProfileIntroduction(undefined))}
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