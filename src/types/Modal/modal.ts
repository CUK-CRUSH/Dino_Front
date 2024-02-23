export interface CustomModalDTO {
  isOpen: boolean;
  uploadImage: string | null;
  onRequestClose: () => void;
  compressedImage: string | null;
  playlists: any[];
  playlistName: string;
  fetchPlaylist: () => void;
  setPlaylistName: (value: string) => void;
}
