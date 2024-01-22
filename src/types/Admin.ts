export interface EditProfileDTO {
  top : number;
  left : number;
  openEditModal : () => void;
  closeOptionsModalOpen : () => void;
}

export interface UserBackgroundImageDTO{
  userBackgroundImage : string | undefined |null;
}

export interface OpenOptionDTO{
  calculateOptionsModalPosition : (e: React.MouseEvent<EventTarget>) => void;
}

export interface UserProfileImageDTO{
  userProfileImage : string | undefined |null;
}

export interface UserProfileInfoDTO{
  username : string | undefined;
  introText : string | undefined;
}