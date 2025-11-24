import { HeartHandshake, CalendarHeart } from 'lucide-react';
import useAnniversaries from '../hooks/useAnniversaries.js';

export default function MemoriesSidebar() {
  const { timeline } = useAnniversaries();

  return (
    <aside className="paper-card rounded-3xl p-4 shadow-soft space-y-4">
      <div className="flex items-center gap-2">
        <HeartHandshake className="text-dusk" />
        <div>
          <p className="text-lg font-semibold">回忆清单</p>
          <p className="text-sm text-dusk/70">重要的日子，别忘了庆祝</p>
        </div>
      </div>
      <div className="space-y-3">
        {timeline.map((item) => (
          <div
            key={item.date}
            className="rounded-2xl bg-white/90 border border-white/60 p-3 shadow-soft flex gap-3"
          >
            <CalendarHeart className="mt-1 text-blush" />
            <div>
              <p className="font-semibold text-dusk">{item.title}</p>
              <p className="text-sm text-dusk/70">{item.description}</p>
              <p className="text-xs text-dusk/50 mt-1">{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
