import { SetUserProfileInfoDTO } from "types/AdminEdit";
import edit from "../../assets/Admin/editButton.svg";

const SetUserProfileInfo = ({ placeholder, maxlength, context, func }: SetUserProfileInfoDTO) => {

  return (
    <>
      <div className="ml-4 mb-2 text-sm">
        User Name
      </div>

      <div className="mb-4 flex flex-col items-center relative">
        <input
          type="text"
          value={context}
          placeholder={placeholder}
          maxLength={maxlength}
          onChange={(e) => func(e.target.value)}
          className="w-11/12 p-2 border-b border-black focus:outline-none bg-white"
        />
        <div className="absolute right-4 top-3">
          <img src={edit} alt="Edit" className="w-4 h-4 cursor-pointer" />
        </div>
      </div></>
  )
}

export default SetUserProfileInfo