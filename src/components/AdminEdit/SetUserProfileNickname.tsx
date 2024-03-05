import { SetUserProfileNicknameDTO } from "types/AdminEdit";
import Check from "../../assets/Validation/Check.svg";
import not from "../../assets/Validation/not.svg";

const SetUserProfileNickname = ({ placeholder, maxlength, name, value, onChange, nicknameValidation }: SetUserProfileNicknameDTO) => {

  return (
    <>
      <div className="ml-4 mb-2 text-sm font-PretendardSemiBold">
        <span>{placeholder}</span>
      </div>

      <div className="w-full mb-4 flex flex-col items-center relative focus:border-slate-300">
        <input
           type="text"
           defaultValue={value}
           name={name}
           placeholder={placeholder}
           maxLength={maxlength}
           onChange={onChange}
          className=" w-buttonWidth p-3 pl-4 pr-12 border 1px bg-white rounded-xl border-slate-200	focus:outline-none font-PretendardSemiBold"
        />
        <div className="absolute right-10 top-4">
          {nicknameValidation ? (
            <img src={Check} alt="Edit" className="w-4 h-4 cursor-pointer" />
          ) : (
            <img src={not} alt="Edit" className="w-4 h-4 cursor-pointer" />
          )}
        </div>
        
      </div>
     
    </>
  )
}

export default SetUserProfileNickname