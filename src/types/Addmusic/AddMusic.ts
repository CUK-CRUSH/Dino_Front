export interface MusicInputDTO {
  label: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  infoButton?: boolean;
  infoText?: string;
  infoToggleHandler?: () => void;
}

export interface AddButtonDTO {
  handleSave: () => void;
}

export interface AddMusicBackButtonDTO {
  handleBack: () => void;
}
