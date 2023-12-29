import { UserProfileImageDTO } from "types/Admin"

const UserProfileImage = ({ userProfileImage }: UserProfileImageDTO) => {
  return (
    <div className="w-[75px] h-[75px] mt-[-35px] rounded-full overflow-hidden ">
      {/* null 이면 디폴트 사진 */}
      <img
        src={userProfileImage ?? "default-image-url.jpg"}
        alt="User Profile"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default UserProfileImage