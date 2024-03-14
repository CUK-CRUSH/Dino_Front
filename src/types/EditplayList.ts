export interface EditPlayListControlsDTO {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
  tutorialStep?: string | null;
}

export interface MusicContentDTO {
  id: string;
  title: string;
  artist: string;
  url: string;
}

export interface MusicDataRowContentProps {
  musicData: MusicContentDTO;
  isEditing: boolean;
  order: number;
  setWidth: (width: number) => void;
  fetchPlaylist: () => void;
  selectedVideoId: string | null;
  width: number;
  selectedVideoIndex: number | null;
  index: number;
  setSelectedVideoId: (id: string | null) => void;
  setSelectedVideoIndex: (index: number | null) => void;
}

export interface EditPlsyListDTO {}

export interface ShowImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  playlists: any;
  isEditing: boolean;
  fetchPlaylist: () => void;
  setUploadImage: (image: string | null) => void;
  tutorialStep: string | null;
}

export interface EditModalDTO {
  onClose: () => void;
}
