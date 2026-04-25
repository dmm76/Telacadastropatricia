import { TextareaHTMLAttributes, forwardRef, useState, useEffect } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  maxCharacters?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, maxCharacters, className = '', onChange, ...props }, ref) => {
    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
      if (props.value) {
        setCharCount(String(props.value).length);
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length);
      if (onChange) {
        onChange(e);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm text-neutral-700 mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          onChange={handleChange}
          className={`
            w-full px-3 py-2.5 bg-white border rounded-lg text-sm text-neutral-900
            placeholder:text-neutral-400
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-[#B89B7C]/20 focus:border-[#B89B7C]
            hover:border-neutral-400
            disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
            ${error ? 'border-red-300 focus:ring-red-100 focus:border-red-400' : 'border-neutral-300'}
            ${className}
          `}
          {...props}
        />
        <div className="flex justify-between items-center mt-1.5">
          <div>
            {error && <p className="text-xs text-red-500">{error}</p>}
            {helperText && !error && <p className="text-xs text-neutral-500">{helperText}</p>}
          </div>
          {maxCharacters && (
            <p className="text-xs text-neutral-400">
              {charCount}/{maxCharacters}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
