export interface MusicInputDTO {
  label: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  infoButton?: boolean;
  infoText?: string;
  infoToggleHandler?: () => void;
  suggestions?: string[]; // 추가
  onSuggestionClick?: (suggestion: string) => void;
}

export interface AddButtonDTO {
  handleSave: () => void;
  plusText: string;
}

export interface AddMusicBackButtonDTO {
  handleBack: () => void;
}
