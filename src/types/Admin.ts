export interface AdminBackgroundImageDTO{
  adminBackgroundImage : string | null;
}

export interface OpenOptionDTO{
  calculateOptionsModalPosition : (e: React.MouseEvent<EventTarget>) => void;
}

export interface UserProfileImageDTO{
  userProfileImage : string | null;
}

export interface UserProfileInfoDTO{
  username : string;
  introText : string;
}