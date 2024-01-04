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
  compressedImage: string | null;
  isCompressLoading: boolean;
  openEditModal: () => void;
}

export interface EditModalDTO {
  onClose: () => void;
  onCrop: (image: string) => void;
}
