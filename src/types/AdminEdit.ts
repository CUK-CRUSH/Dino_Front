export interface EditButtonDTO {
    save : () => void;
    cancel : () => void;
  }

export interface SetUserProfileBackgroundDTO {
  userProfileBackgroundImage : string | null;
  handleUserProfileBackgroundImage : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SetUserProfileImageDTO {
  userProfileImage : string | null;
  handleUserProfileImage : (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SetUserProfileInfoDTO {
  placeholder : string;
  maxlength : number;
  context : string;
  func : React.Dispatch<React.SetStateAction<string>>;
}