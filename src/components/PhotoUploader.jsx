import { useRef, useState } from 'react';
import { ImagePlus, Trash } from 'lucide-react';
import PolaroidCard from './PolaroidCard.jsx';
import { readFileAsDataUrl } from '../utils/imageUtils.js';

export default function PhotoUploader({ value, onChange, showTape }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  const handlePick = () => {
    inputRef.current?.click();
  };

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件');
      return;
    }
    setError('');
    const dataUrl = await readFileAsDataUrl(file);
    onChange(dataUrl);
  };

  const clear = () => {
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePick}
          className="rounded-2xl bg-sand px-4 py-2 shadow-soft border border-white/60 hover:border-dusk/20"
        >
          <div className="flex items-center gap-2">
            <ImagePlus className="w-4 h-4" />
            <span>上传照片</span>
          </div>
        </button>
        {value && (
          <button
            type="button"
            onClick={clear}
            className="rounded-2xl bg-white/80 px-3 py-2 border border-dusk/10 hover:border-dusk/30"
          >
            <div className="flex items-center gap-1 text-sm">
              <Trash className="w-4 h-4" />
              <span>移除</span>
            </div>
          </button>
        )}
        {error && <p className="text-sm text-rose-500">{error}</p>}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFile}
        className="hidden"
      />

      <PolaroidCard src={value} caption="今日小记" showTape={showTape} />
    </div>
  );
}
