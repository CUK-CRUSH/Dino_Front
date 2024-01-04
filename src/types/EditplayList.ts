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
}

export interface MusicDataDTO {
  musicData: MusicData;
}

export interface EditPlsyListDTO {}

export interface ShowImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  compressedImage: string | null;
  isCompressLoading: boolean;
}

export interface EditModalDTO {
  onClose: () => void;
}
