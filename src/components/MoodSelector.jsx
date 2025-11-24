export default function MoodSelector({ moods, selected, onSelect }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
      {moods.map((mood) => (
        <button
          key={mood.id}
          type="button"
          onClick={() => onSelect(mood)}
          className={`flex flex-col items-center gap-1 rounded-2xl border p-3 transition shadow-soft ${
            selected?.id === mood.id
              ? 'border-dusk bg-sand'
              : 'border-transparent bg-white/80 hover:border-dusk/40'
          }`}
          style={{ backgroundColor: selected?.id === mood.id ? undefined : `${mood.color}33` }}
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="text-sm text-dusk/80">{mood.label}</span>
        </button>
      ))}
    </div>
  );
}
