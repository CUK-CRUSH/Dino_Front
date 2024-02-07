export interface CustomModalDTO {
  isOpen: boolean;
  uploadImage: string | null;
  onRequestClose: () => void;
  compressedImage: string | null;
  playlists: any[];
  token: string;
  playlistName: string;
  musicData: any;
  playlistId: string | undefined;
  usernames: string | null;
  fetchPlaylist: () => void;
  setPlaylistName: (value: string) => void;
}
