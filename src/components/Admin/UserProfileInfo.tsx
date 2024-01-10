import { UserProfileInfoDTO } from "types/Admin";

const UserProfileInfo = ({ username, introText } : UserProfileInfoDTO) => {
  return (
    <div className="w-full ">
      <div className="w-full text-center text-white text-[25px] font-bold font-['Noto Sans'] leading-[18px] mx-auto mt-[19px]">
        {username}
      </div>
      <div className="text-center text-white text-[15px] font-medium font-['Noto Sans'] leading-[18px] mt-[19px]">
        {introText}
      </div>
    </div>
  );
};

export default UserProfileInfo;
