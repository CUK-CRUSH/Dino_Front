export interface EditPlayListControlsDTO {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface MusicContentDTO {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export interface MusicDataRowContentProps {
  musicData: MusicContentDTO;
  isEditing: boolean;
  order: number;
  token: string;
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
  token: string;
  isEditing: boolean;
  fetchPlaylist: () => void;
}

export interface EditModalDTO {
  onClose: () => void;
}
