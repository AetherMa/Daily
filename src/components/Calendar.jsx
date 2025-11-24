import { ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useMemo } from 'react';
import { getMonthLabel, getMonthMatrix } from '../utils/dateUtils.js';

export default function Calendar({ entries = [], currentMonth, onMonthChange, onSelectDay }) {
  const entryMap = useMemo(
    () =>
      entries.reduce((acc, entry) => {
        acc[entry.date] = entry;
        return acc;
      }, {}),
    [entries]
  );

  const weeks = getMonthMatrix(currentMonth);
  const monthLabel = getMonthLabel(currentMonth);

  const handlePrev = () => onMonthChange(-1);
  const handleNext = () => onMonthChange(1);

  return (
    <section className="paper-card rounded-3xl p-4 md:p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-dusk/70">月视图</p>
          <h2 className="text-2xl font-semibold">{monthLabel}</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="h-10 w-10 rounded-2xl bg-sand flex items-center justify-center shadow-soft"
            aria-label="上个月"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="h-10 w-10 rounded-2xl bg-sand flex items-center justify-center shadow-soft"
            aria-label="下个月"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-sm text-dusk/70 mb-2">
        {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
          <div key={day} className="py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((cell) => {
          const entry = entryMap[cell.dateString];
          const isFilled = Boolean(entry);
          return (
            <button
              key={cell.dateString}
              type="button"
              onClick={() => onSelectDay(cell.dateString)}
              className={`aspect-square rounded-2xl border transition relative overflow-hidden ${
                isFilled
                  ? 'bg-sand border-dusk/20 shadow-soft'
                  : 'bg-white/80 border-dusk/10 hover:border-dusk/30'
              } ${cell.isToday ? 'ring-2 ring-blush/70' : ''} ${
                cell.isCurrentMonth ? '' : 'opacity-50'
              }`}
            >
              <div className="absolute top-2 left-2 text-xs text-dusk/70">{cell.label}</div>
              {isFilled ? (
                <div className="flex h-full items-center justify-center text-2xl">
                  <span>{entry.mood?.emoji || '📌'}</span>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-dusk/50">
                  写日记 +
                </div>
              )}
              {entry?.photo && (
                <div className="absolute bottom-2 right-2 text-dusk/70">
                  <ImageIcon className="w-4 h-4" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
