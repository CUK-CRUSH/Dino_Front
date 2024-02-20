export interface searchResultsDTO {
  data: Data;
}

interface Data {
  members: Member[];
  playlists: Playlist[];
}

export interface Member {
  id : number,
  username : string,
  introduction : string,
  profileImageUrl : string | null
}

export interface Playlist {
  id: number,
  playlistName: string,
  thumbnailUrl: string | null
} 