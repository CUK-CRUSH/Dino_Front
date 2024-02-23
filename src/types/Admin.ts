export interface LoadingDTO {
  isLoading: boolean;
}

export interface EditProfileDTO {
  openEditModal: () => void;
  closeOptionsModalOpen: () => void;
  authority?: boolean;
}

export interface UserBackgroundImageDTO {
  userBackgroundImage: string | undefined | null;
}

export interface OpenOptionDTO {
  calculateOptionsModalPosition: (e: React.MouseEvent<EventTarget>) => void;
}

export interface UserProfileImageDTO {
  userProfileImage: string | undefined | null;
}

export interface UserProfileInfoDTO {
  username: string | undefined;
  introText?: string | undefined;
}

export interface getMemberDTO {
  backgroundImageUrl: string | null;
  id?: string;
  introduction: string;
  name?: string;
  oauth2id?: string;
  profileImageUrl: string | null;
  username: string;
  profileImage?: string | null;
}

export interface getPlaylistDTO {
  username? : string;
  id: number | undefined,
  playlistName : string,
  thumbnailUrl : string | null,
  numberOfMusics? : number,
  likeCount?: number,
  isLike? : boolean,
  }

