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
  playlistId: string | undefined;
  username: string | null;
  token: string;
  setWidth: (width: number) => void;
  fetchPlaylist: () => void;
}

export interface EditPlsyListDTO {}

export interface ShowImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  playlists: any;
  token: string;
  isEditing: boolean;
  playlistId: string | undefined;
}

export interface EditModalDTO {
  onClose: () => void;
}
