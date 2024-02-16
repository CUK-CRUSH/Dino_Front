import { SetUserProfileIntroductionDTO } from "types/AdminEdit";

const SetUserProfileIntroduction = ({ placeholder, maxlength, name, value, onChange,handleKeyDown }: SetUserProfileIntroductionDTO) => {

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
           onKeyDown={handleKeyDown}
           className=" w-11/12 p-3 pl-4 pr-12 border 1px bg-white rounded-xl border-slate-200	focus:outline-none font-PretendardMedium"
        />
      </div>
    </>
  )
}

export default SetUserProfileIntroduction