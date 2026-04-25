import { useState, useRef } from 'react';
import { Upload, X, Plus } from 'lucide-react';

interface ImageUploadProps {
  label?: string;
  onImagesChange?: (files: File[]) => void;
}

export function ImageUpload({ label, onImagesChange }: ImageUploadProps) {
  const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);
    onImagesChange?.(updatedImages.map(img => img.file));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange?.(updatedImages.map(img => img.file));
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-neutral-700 mb-2">{label}</label>
      )}

      {images.length === 0 ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragging
              ? 'border-[#B89B7C] bg-[#B89B7C]/5'
              : 'border-neutral-300 hover:border-[#B89B7C] hover:bg-neutral-50'
            }
          `}
        >
          <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
          <p className="text-sm text-neutral-700 mb-1">
            Arraste e solte ou clique para selecionar
          </p>
          <p className="text-xs text-neutral-500">
            PNG, JPG ou WEBP até 5MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-4 gap-3 mb-3">
            {images.map((image, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-neutral-100 group">
                <img
                  src={image.preview}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
                {index === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2">
                    Principal
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-neutral-300 rounded-lg text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Adicionar imagem
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      <p className="mt-2 text-xs text-neutral-500">
        Essa será a imagem exibida na listagem e vitrine.
      </p>
    </div>
  );
}
