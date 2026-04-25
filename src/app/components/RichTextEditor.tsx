import { useState } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  maxCharacters?: number;
  placeholder?: string;
}

export function RichTextEditor({
  label,
  value,
  onChange,
  maxCharacters,
  placeholder = 'Digite aqui...'
}: RichTextEditorProps) {
  const [charCount, setCharCount] = useState(value.length);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange(newValue);
  };

  const toolbarButtons = [
    { icon: Bold, label: 'Negrito' },
    { icon: Italic, label: 'Itálico' },
    { icon: Underline, label: 'Sublinhado' },
    { icon: List, label: 'Lista' },
    { icon: ListOrdered, label: 'Lista numerada' },
    { icon: LinkIcon, label: 'Link' },
    { icon: ImageIcon, label: 'Imagem' }
  ];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-neutral-700 mb-2">{label}</label>
      )}

      <div className="border border-neutral-300 rounded-lg overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#B89B7C]/20 focus-within:border-[#B89B7C]">
        <div className="flex items-center gap-1 px-3 py-2 border-b border-neutral-200 bg-neutral-50">
          {toolbarButtons.map((btn, idx) => {
            const Icon = btn.icon;
            return (
              <button
                key={idx}
                type="button"
                title={btn.label}
                className="p-1.5 rounded hover:bg-white hover:text-neutral-900 text-neutral-600 transition-colors"
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none resize-none min-h-[120px]"
        />
      </div>

      {maxCharacters && (
        <div className="flex justify-end mt-1.5">
          <p className="text-xs text-neutral-400">
            {charCount}/{maxCharacters}
          </p>
        </div>
      )}
    </div>
  );
}
