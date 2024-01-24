// 타입지정

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