export interface MusicInputDTO {
  label: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions?: string[]; // 추가
  onSuggestionClick?: (suggestion: string) => void;
  type: string;
}

export interface AddButtonDTO {
  handleSave: (e: React.MouseEvent<HTMLButtonElement>) => void;
  plusText: string;
}
export interface EditButtonDTO {
  handlePatch: () => void;
  plusText: string;
}

export interface AddMusicBackButtonDTO {
  handleBack: () => void;
}
