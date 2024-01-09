export interface CustomModalDTO {
  isOpen: boolean;
  onRequestClose: () => void;
  compressedImage: string | null;
}
