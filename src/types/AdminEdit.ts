export interface UpdateMemberParams {
  username?: string;
  introduction?: string | null;
  profileImage?: string | null;
  backgroundImage?: string | null;
  deleteProfileImage? : boolean;
  deleteBackgroundImage? : boolean;
  cookies?: string;

}

export interface EditButtonDTO {
  save: (updateMemberData: UpdateMemberParams) => void;
  cancel : () => void;
  updateMemberData: UpdateMemberParams;
  }

export interface SetUserProfileBackgroundDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  isCompressLoading?: boolean;
  earlyImage?: string | null;
  profileBackgroundImage? : string | null;

}

export interface SetUserProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  isCompressLoading?: boolean;
  earlyImage?: string | null;
  profileImage? : string | null;

}

export interface SetUserProfileInfoDTO {
  placeholder : string;
  maxlength : number;
  name : string | undefined;
  value : string | undefined
  onChange? : (e: { target: { name: any; value: any; }; }) => void; 
}