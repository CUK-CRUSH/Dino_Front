import { debounce } from "lodash";
import Fanfare from "../../assets/Validation/Fanfare.svg";
import Check from "../../assets/Validation/Check.svg";
import not from "../../assets/Validation/not.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  getMember,
  getNicknameAvailable,
  updateMember,
} from "@api/member-controller/memberController";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import ToastComponent from "@components/Toast/Toast";
import { useDispatch } from "react-redux";
import { setToast } from "@reducer/Toast/toast";
import { checkBadWord } from "@utils/checkBadWord/checkBadWord";
import { UpdateMemberParams } from "types/AdminEdit";
import useDecodedJWT from "@hooks/useDecodedJWT";

const ValidationProps = () => {
  const navigate = useNavigate();

  // 유효상태
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(false);

  // 쿠키
  const [cookies] = useCookies(["accessToken"]);
  // 액세스 토큰
  const token = cookies.accessToken;

  const dispatch = useDispatch();
  
  // 닉네임 체크
const checkNickname = (nickname: string) => {
  // 숫자영어 _ . 허용
  const nicknameRegex = /^[a-zA-Z0-9._]{3,30}$/;
  console.log(nickname);
  if (nicknameRegex.test(nickname)) {
    if (!checkBadWord(nickname)) {
      return true;
    }
  } else if (!nicknameRegex.test(nickname)) {
    return false;
  }
};
// import { checkNickname } from "@utils/checkNickname/checkNickname";

  const onChange = debounce(async (e) => {
    setUpdateMemberData((prevData) => ({
      ...prevData,
      username: e.target.value.toLowerCase(),
    }));  
    if (e.target.value) {
      try {
        // Check backend nickname
        const checkNicknameBack = await getNicknameAvailable(
          e.target.value,
          token
        );
        console.log(checkNicknameBack);
  
        if (!checkBadWord(e.target.value) && checkNickname(e.target.value) && checkNicknameBack.status === 200) {
          setNicknameValidation(true);
        } else if (
          !checkNickname(e.target.value) &&
          checkNicknameBack.status !== 200
        ) {
          setNicknameValidation(false);
        } else {
          setNicknameValidation(false);
        }
      } catch (error : any) {
        console.log(error)
        // If the status is 400, simply skip the error
        if (error.response && error.response.status === 400) {
          dispatch(setToast('duplicate'));
          setNicknameValidation(false);
        } else {
          console.error("Error checking nickname:", error);
        }
      }
    } else {
      setNicknameValidation(false);
    }
  }, 500);

  console.log(cookies);

  const [updateMemberData, setUpdateMemberData] = useState<UpdateMemberParams>({
    // 입력없을때 닉네임 통과
    username: '',
    introduction: '',
    profileImage: '',
    backgroundImage: '',
    cookies: token,
  });
  
  const handleMember = async (data: UpdateMemberParams) => {
    console.log("Saving data:", data);

    await new Promise(resolve => setTimeout(resolve, 300));
    const code = await updateMember(data);

    if (code.status === 200) {
      dispatch(setToast('login'));

      navigate(`/SetProfile/${code.data.username}/1`);
    }
  };

  // 토스트
  const { toast } = useSelector(
    (state: RootState) => state.toast
  );
  
  const decodedToken = useDecodedJWT(cookies.accessToken);
  const id = Number(decodedToken?.sub);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (decodedToken) {
      (async () => {
        try {
          if (id !== null) {
            const getUserData = await getMember(id);
            console.log(getUserData);
  
            if (getUserData.data.username) {
              dispatch(setToast("login"));
              navigate(`/user/${getUserData.data.username}`);
            }
          }
        } catch (error) {
          console.error("Error fetching member:", error);
        }
      })();
    } else {
      console.error("Decoded token is not present");
    }
  }, []);

    return (
    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
      {toast === 'login' && <ToastComponent background="black" text="로그인 성공 ! " /> }
      {toast === 'duplicate' && <ToastComponent background="black" text="이미 존재하는 닉네임입니다 ! " /> }

      <div className="text-center text-black text-xl font-semibold font-['Noto Sans'] my-10">
        <img className="mx-auto mt-16 mb-10" src={Fanfare} alt="Fanfare" />
        환영합니다 !
        <br />
        사용하실 닉네임을 작성해주세요 !
        <br />
        <span className="text-slate-400 inline-flex items-center text-xs font-semibold leading-4 tracking-normal text-center my-1">
          <BsFillExclamationCircleFill className="mr-1" />
          닉네임은 3~30 자의 영문,숫자만 사용가능합니다.
        </span>
      </div>
      <div className="w-11/12 mb-4 flex flex-col items-center relative focus:border-slate-300">
        <input
          type="text"
          onChange={(e) => onChange(e)}
          placeholder={"닉네임"}
          className=" w-11/12 p-2 pr-12 border 1px bg-white rounded-3xl text-center border-slate-200	focus:outline-none "
        />
        <div className="absolute right-10 top-3">
          {nicknameValidation ? (
            <img src={Check} alt="Edit" className="w-4 h-4 cursor-pointer" />
          ) : (
            <img src={not} alt="Edit" className="w-4 h-4 cursor-pointer" />
          )}
        </div>
        
      </div>
      {!nicknameValidation ? 
        <div
          className="absolute bottom-0 -left-0 p-4 w-full bg-[#b6b6b6] text-white flex items-center justify-center overflow-hidden"
        >
          계속하기 
        </div>
        :
        <div
          className="absolute bottom-0 -left-0 p-4 w-full bg-[#000000] text-white flex items-center justify-center overflow-hidden"
          onClick={() => handleMember(updateMemberData)}
        > 
          계속하기 
        </div>
      }
    </div>
  );
};

export default ValidationProps;
