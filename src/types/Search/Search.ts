export interface SearchPlaylistDTO {
  top: number;
}

export interface SearchUserDTO {
  top: number;
}

interface Data {
  members: Member[];
  playlists: Playlist[];
}

export interface searchResultsDTO {
  data: Data;
  // 필요한 추가적인 속성들을 아래에 추가하세요.
}

export interface Member {
  id : number,
  username : string,
  introduction : string,
  profileImageUrl : string | null
}

export interface Playlist {
  id: number,
  name: string,
  thumbnailUrl: string | null
} 