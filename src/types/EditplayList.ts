export interface EditPlayListControlsDTO {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface MusicDataDTO {
  isEditing: boolean;
  musicList: any;
  playlistId: string | undefined;
}

export interface MusicContentDTO {
  id: number;
  title: string;
  artist: string;
  url: string;
}

export interface MusicDataRowContentProps {
  titleRef: React.RefObject<HTMLSpanElement>;
  artistRef: React.RefObject<HTMLSpanElement>;
  TitleLength: boolean;
  ArtistLength: boolean;
  musicData: MusicContentDTO;
  isEditing: boolean;
  order: number;
}

export interface EditPlsyListDTO {}

export interface ShowImageDTO {
  aspectRatio: number;
  onCrop: (image: string) => void;
  playlists: any;
  isCompressLoading: boolean;
  isEditing: boolean;
  playlistId: string | undefined;
}

export interface EditModalDTO {
  onClose: () => void;
}

export interface ImageDisplayDTO {
  compressedImage: string | null;
  isCompressLoading: boolean;
  cursor: string | null;
}
