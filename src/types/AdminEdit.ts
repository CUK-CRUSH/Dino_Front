export interface EditButtonDTO {
    save : () => void;
    cancel : () => void;
  }

export interface SetUserProfileBackgroundDTO {
  userBackgroundImage : string | null;
  handleUserProfileBackgroundImage : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SetUserProfileImageDTO {
  userProfileImage : string | null;
  handleUserProfileImage : (e: React.ChangeEvent<HTMLInputElement>) => void;
}