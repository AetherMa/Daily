import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import useGreeting from '../hooks/useGreeting.js';
import useAnniversaries from '../hooks/useAnniversaries.js';
import StickyNote from './StickyNote.jsx';

export default function HeroSection({ entriesCount = 0 }) {
  const { greeting, note } = useGreeting();
  const { next } = useAnniversaries();

  return (
    <section className="paper-card rounded-3xl p-6 md:p-8 shadow-soft relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-60" aria-hidden />
      <div className="flex items-start gap-4">
        <motion.div
          className="h-12 w-12 rounded-2xl bg-blush/70 flex items-center justify-center shadow-soft"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <Heart className="text-dusk" />
        </motion.div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <motion.h1
              className="text-3xl md:text-4xl font-semibold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {greeting}
            </motion.h1>
            <Sparkles className="h-5 w-5 text-blush" />
          </div>
          <p className="text-lg text-dusk/80">{note}</p>
          <p className="text-sm text-dusk/70">
            已经记录的日子：<span className="font-semibold">{entriesCount}</span>
          </p>
        </div>
      </div>

      {next && (
        <div className="mt-6 max-w-md">
          <StickyNote
            title={`下一次 · ${next.title}`}
            subtitle={next.description}
            footer={`还有 ${next.daysLeft} 天 · ${next.date}`}
          />
        </div>
      )}
    </section>
  );
}
