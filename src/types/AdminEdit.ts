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
  earlyImage: string | undefined ;
}

export interface SetUserProfileImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | undefined | null;
  isCompressLoading: boolean;
  earlyImage: string | undefined ;

}

export interface SetUserProfileInfoDTO {
  placeholder : string;
  maxlength : number;
  name : string | undefined;
  value : string | undefined
  onChange : (e: { target: { name: any; value: any; }; }) => void; 
}