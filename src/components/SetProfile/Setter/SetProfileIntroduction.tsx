import { SetUserProfileIntroductionDTO } from "types/SetProfile/setProfile"

const SetProfileIntroduction = ({ placeholder, maxlength, name, value, onChange }: SetUserProfileIntroductionDTO) => {
    return(
        <div className="relative top-96 flex flex-col items-center w-buttonWidth">
        <input
          type="text"
          defaultValue={value}
          name={name}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={onChange}
          className="w-buttonWidth p-4 rounded-xl	border border-slate-300 focus:outline-none bg-white"
        />
        
      </div>
    )
}

export default SetProfileIntroduction
