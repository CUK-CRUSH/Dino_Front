export interface EditButtonDTO {
    save : (  username: string,
      introduction: string,
      profileImage?: File,
      backgroundImage?: File,
      cookies?: string,) => void;
    cancel : () => void;
  }

export interface SetUserProfileBackgroundDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | null;
  isCompressLoading: boolean;
}

export interface SetUserProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | null;
  isCompressLoading: boolean;

}

export interface SetUserProfileInfoDTO {
  placeholder : string;
  maxlength : number;
  context : string | undefined;
  func : React.Dispatch<React.SetStateAction<string>>;
}