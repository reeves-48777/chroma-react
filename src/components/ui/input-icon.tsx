import { Check, ImageUp, X } from 'lucide-react';
import { useState } from 'react';

export type InputIconProps = React.ComponentPropsWithoutRef<'input'> & {
  onFileChange: (file: File | null) => void;
};

const InputIcon = (props: InputIconProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isValidFile, setIsValidFile] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      const isImage = file.type.startsWith('image/');
      if (isImage) {
        setErrorMessage(null);
        props.onFileChange(file);
        setIsValidFile(true);
      } else {
        setErrorMessage('please upload a valid image file');
        props.onFileChange(null);
        setIsValidFile(false);
      }
    }
  };
  return (
    <div className="flex items-center">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
        />
        <div className="flex gap-2 items-center border rounded-lg p-2">
          <ImageUp />
          <span>Upload image</span>
          {isValidFile ? (
            <Check className="text-green-600" />
          ) : (
            <X className="text-red-600" />
          )}
        </div>
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm ml-4">{errorMessage}</p>
      )}
    </div>
  );
};

export default InputIcon;
