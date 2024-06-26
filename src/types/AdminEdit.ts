export interface UpdateMemberParams {
  username?: string;
  introduction?: any;
  profileImage?: string | null;
  backgroundImage?: string | null;
  deleteProfileImage? : boolean;
  deleteBackgroundImage? : boolean;
  cookies?: string;

}

export interface EditButtonDTO {
  save: ((updateMemberData: UpdateMemberParams) => void) ;
  cancel : () => void;
  updateMemberData: UpdateMemberParams;
  }

export interface SetUserProfileBackgroundDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  earlyImage?: string | null;
  profileBackgroundImage? : string | null;

}

export interface SetUserProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  earlyImage?: string | null;
  profileImage? : string | null;

}

export interface SetUserProfileNicknameDTO {
  placeholder : string;
  maxlength : number;
  name : string | undefined;
  value : string | undefined
  onChange? : (e: { target: { name: any; value: any; }; }) => void; 
  nicknameValidation? : boolean;
}

export interface SetUserProfileIntroductionDTO {
  placeholder : string;
  maxlength : number;
  name : string | undefined;
  value : string | undefined
  onChange? : (e: { target: { name: any; value: any; }; }) => void; 
  handleKeyDown : (event: React.KeyboardEvent<HTMLInputElement>) => void;
}