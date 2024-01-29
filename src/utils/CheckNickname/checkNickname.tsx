import { checkBadWord } from "@utils/checkBadWord/checkBadWord";
  
  // 닉네임 체크
  export const checkNickname = (nickname : string) => {
    // 한글숫자영어 _ . 허용
    console.log(nickname)
    const nicknameRegex = /^[a-zA-Z0-9._]{3,30}$/;
    if(nicknameRegex.test(nickname)){
      return true
    }
    else if(!nicknameRegex.test(nickname)){
      
        return false
      
    }
  };