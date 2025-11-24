export default function StickyNote({ title, subtitle, footer }) {
  return (
    <div className="relative rounded-2xl bg-sand p-4 shadow-note border border-white/70">
      <div className="tape" aria-hidden />
      <p className="text-sm uppercase tracking-wide text-dusk/70">Sticky</p>
      <h3 className="text-xl font-semibold text-dusk">{title}</h3>
      {subtitle && <p className="mt-1 text-dusk/80">{subtitle}</p>}
      {footer && <p className="mt-3 text-sm text-dusk/70">{footer}</p>}
    </div>
  );
}
