import { debounce } from "lodash";
import Fanfare from "../../assets/Validation/Fanfare.svg";
import Check from "../../assets/Validation/Check.svg";
import not from "../../assets/Validation/not.svg";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { useState } from "react";
import { useCookies } from "react-cookie";
import {
  getNicknameAvailable,
  putUsername,
} from "@api/member-controller/memberController";
import { checkBadWord } from "@utils/checkBadWord/checkBadWord";
import { useNavigate } from "react-router-dom";

// 닉네임 체크
export const checkNickname = (nickname: string) => {
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

const ValidationProps = () => {
  const navigate = useNavigate();

  // 유효상태
  const [nicknameValidation, setNicknameValidation] = useState<boolean>(false);

  // 유저네임
  const [username, setUsername] = useState<string>("");

  // 쿠키
  const [cookies] = useCookies(["accessToken"]);
  // 액세스 토큰
  const token = cookies.accessToken;

  const onChange = debounce(async (e) => {
    setUsername(e.target.value);
    console.log(token)
    if (e.target.value) {
      // Backend 닉네임 체크
      const checkNicknameBack = await getNicknameAvailable(
        e.target.value,
        token
      );
      console.log(checkNicknameBack);

      if (checkNickname(e.target.value) && checkNicknameBack.status === 200) {
        setNicknameValidation(true);
      } else if (
        !checkNickname(e.target.value) &&
        checkNicknameBack.status !== 200
      ) {
        setNicknameValidation(false);
      } else {
        setNicknameValidation(false);
      }
    } else {
      setNicknameValidation(false);
    }
  }, 500);

  console.log(cookies);

  const handleUsername = async (username: string, cookies: string) => {
    console.log(username, cookies);

    const putUsernameState = await putUsername(username, cookies);
    console.log(putUsernameState);
    if (putUsernameState.status === 200) {
      navigate(`/SetProfile/${putUsernameState.data}/1`);
    }
  };

  return (
    <div className="w-full h-full relative bg-white flex flex-col align-middle items-center">
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
      <div
        className="fixed w-full h-[70px] mx-auto bottom-0 pt-6 text-center text-white bg-black"
        onClick={() => handleUsername(username, cookies.accessToken)}
      >
        계속하기
      </div>
    </div>
  );
};

export default ValidationProps;
