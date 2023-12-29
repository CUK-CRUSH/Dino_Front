export interface ImageCropsDTO {
  onCrop: (image: string) => void;
  aspectRatio: number;
  children: React.ReactNode;
}
