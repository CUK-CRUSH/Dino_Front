export interface EditPlayListControlsDTO {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

interface MusicData {
  // id: number;
  title: string;
  artist: string;
  url: string;
}

export interface MusicDataDTO {
  musicData: MusicData;
}

export interface ATO {
  title: string;
  artist: string;
  url: string;
}

export interface EditPlsyListDTO {}

export interface ShowImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | null;
  isCompressLoading: boolean;
  isEditing: boolean;
}

export interface EditModalDTO {
  onClose: () => void;
}

export interface ImageDisplayDTO {
  compressedImage: string | null;
  isCompressLoading: boolean;
  cursor: string | null;
}
