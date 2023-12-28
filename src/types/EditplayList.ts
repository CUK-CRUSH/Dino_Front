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

export interface ImageSelectorDTO {
  selectedImage: string | null;
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
