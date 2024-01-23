export interface CustomModalDTO {
  isOpen: boolean;
  onRequestClose: () => void;
  compressedImage: string | null;
  playlists: any[];
  token: string;
}
