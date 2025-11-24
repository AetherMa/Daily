import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Save } from 'lucide-react';
import MoodSelector from './MoodSelector.jsx';
import PhotoUploader from './PhotoUploader.jsx';
import moods from '../constants/moods.js';

export default function EntryModal({ open, date, entry, onClose, onSave }) {
  const [mood, setMood] = useState(null);
  const [story, setStory] = useState('');
  const [photo, setPhoto] = useState(null);
  const [sticker, setSticker] = useState(true);

  useEffect(() => {
    if (entry) {
      setMood(entry.mood || null);
      setStory(entry.story || '');
      setPhoto(entry.photo || null);
      setSticker(entry.sticker ?? true);
    } else {
      setMood(null);
      setStory('');
      setPhoto(null);
      setSticker(true);
    }
  }, [entry, open]);

  const handleSave = () => {
    const payload = {
      ...entry,
      date,
      mood,
      story,
      photo,
      sticker
    };
    onSave(payload);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-cream p-6 shadow-2xl relative">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm text-dusk/70">日期</p>
                  <h3 className="text-2xl font-semibold">{date}</h3>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="h-10 w-10 rounded-2xl bg-sand flex items-center justify-center shadow-soft"
                    onClick={onClose}
                    aria-label="关闭"
                  >
                    <X />
                  </button>
                </div>
              </div>

              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-sm text-dusk/70 mb-2">今天的心情</p>
                  <MoodSelector moods={moods} selected={mood} onSelect={setMood} />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-dusk/70">故事</p>
                    <label className="flex items-center gap-2 text-sm text-dusk/80">
                      <input
                        type="checkbox"
                        checked={sticker}
                        onChange={(e) => setSticker(e.target.checked)}
                      />
                      贴上胶带
                    </label>
                  </div>
                  <textarea
                    className="w-full rounded-2xl border border-dusk/15 bg-white/90 p-3 shadow-soft focus:outline-none focus:ring-2 focus:ring-blush/60"
                    rows={5}
                    placeholder="写下今天的点滴、惊喜或心跳..."
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                  />
                </div>

                <div>
                  <p className="text-sm text-dusk/70 mb-2">照片</p>
                  <PhotoUploader value={photo} onChange={setPhoto} showTape={sticker} />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 rounded-2xl bg-dusk text-cream px-5 py-3 shadow-soft hover:shadow-lg transition"
                >
                  <Save className="w-4 h-4" />
                  <span>保存日记</span>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
