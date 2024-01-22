export interface UpdateMemberParams {
  username: string | undefined;
  introduction: string | undefined;
  profileImage?: string;
  backgroundImage?: string;
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
  compressedImage: string | undefined | null;
  isCompressLoading: boolean;
}

export interface SetUserProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | undefined | null;
  isCompressLoading: boolean;

}

export interface SetUserProfileInfoDTO {
  placeholder : string;
  maxlength : number;
  context : string | undefined;
  func : React.Dispatch<React.SetStateAction<string>>;
}