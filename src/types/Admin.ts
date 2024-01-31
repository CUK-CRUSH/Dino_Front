export interface LoadingDTO {
  isLoading : boolean;
}

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

export interface getMemberDTO {
  profileBackgroundImageUrl : string | null,
  id? : number,
  introduction : string,
  name? : string,
  oauth2id? : string,
  profileImageUrl : string | null,
  username : string,
  }
  
export interface getPlaylistDTO {
  id: number | undefined,
  playlistName : string,
  thumbnailUrl : string | null,
  numberOfMusics : number,
  }