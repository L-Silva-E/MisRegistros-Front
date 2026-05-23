export interface ImageUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  existingUrl?: string;
  error?: string;
}
