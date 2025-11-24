import { useMemo } from 'react';
import { randomRotation } from '../utils/imageUtils.js';

export default function PolaroidCard({ src, caption, showTape = false }) {
  const tilt = useMemo(() => randomRotation(), []);

  return (
    <div
      className="polaroid relative"
      style={{
        transform: tilt
      }}
    >
      {showTape && <div className="tape" aria-hidden />}
      {src ? (
        <img
          src={src}
          alt={caption || '记忆照片'}
          className="h-48 w-full object-cover rounded-xl"
        />
      ) : (
        <div className="h-48 w-full rounded-xl bg-cream border border-dashed border-dusk/20 grid place-items-center text-dusk/60">
          暂无照片
        </div>
      )}
      {caption && <p className="mt-2 text-center text-dusk/80">{caption}</p>}
    </div>
  );
}
