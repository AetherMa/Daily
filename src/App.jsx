import { useMemo, useState } from 'react';
import { Heart } from 'lucide-react';
import HeroSection from './components/HeroSection.jsx';
import Calendar from './components/Calendar.jsx';
import EntryModal from './components/EntryModal.jsx';
import MemoriesSidebar from './components/MemoriesSidebar.jsx';
import Drawer from './components/Drawer.jsx';
import useLocalStorage from './hooks/useLocalStorage.js';
import { formatDate, shiftMonth } from './utils/dateUtils.js';

export default function App() {
  const [entries, setEntries] = useLocalStorage('daily-entries', []);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));
  const [openModal, setOpenModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeEntry = useMemo(
    () => entries.find((item) => item.date === selectedDate),
    [entries, selectedDate]
  );

  const handleSelectDay = (dateString) => {
    setSelectedDate(dateString);
    setOpenModal(true);
  };

  const handleSave = (payload) => {
    setEntries((prev) => {
      const others = prev.filter((item) => item.date !== payload.date);
      const id =
        payload.id || (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()));
      return [...others, { ...payload, id }];
    });
    setOpenModal(false);
  };

  const changeMonth = (offset) => {
    setCurrentMonth((prev) => shiftMonth(prev, offset));
  };

  return (
    <div className="min-h-screen bg-cream text-cocoa">
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-dusk/70">Daily · Cozy Diary</p>
            <h1 className="text-2xl font-semibold">暖暖的情侣日记</h1>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 rounded-2xl bg-sand px-3 py-2 shadow-soft"
          >
            <Heart className="w-4 h-4" />
            纪念日
          </button>
        </div>

        <HeroSection entriesCount={entries.length} />

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <Calendar
              entries={entries}
              currentMonth={currentMonth}
              onMonthChange={changeMonth}
              onSelectDay={handleSelectDay}
            />
          </div>
          <div className="hidden lg:block w-full max-w-xs">
            <MemoriesSidebar />
          </div>
        </div>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="纪念日">
        <MemoriesSidebar />
      </Drawer>

      <EntryModal
        open={openModal}
        date={selectedDate}
        entry={activeEntry}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
      />
    </div>
  );
}
