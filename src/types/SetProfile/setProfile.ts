// 타입지정

export interface SkipDTO {
  step : number;
  username : string | undefined;
}

export interface NextDTO {
  step : number;
  username : string | undefined;
  profileImage : string | null;
  profileBackgroundImage : string | null;
  profileIntroduction : string | null;
}

export interface ProgressDTO {
  step : number;
}
  
export interface TextDTO {
  step : number;
}

export interface SetProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | undefined | null;
  isCompressLoading: boolean;
}

export interface SetProfileBackgroundImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | undefined | null;
  isCompressLoading: boolean;
}

export interface SetUserProfileIntroductionDTO {
  placeholder : string;
  maxlength : number;
  name : string | undefined;
  value : string | undefined
  onChange : (e: { target: { name: any; value: any; }; }) => void; 
}