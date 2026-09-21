// "📞 แนะนำให้โทรสอบถามก่อนมา" notice — each shop passes its own reason and numbers
export type CallFirstPhone = { label?: string; phone: string; phoneDisplay: string };

export function CallFirst({ text, phones = [], className = "" }: { text: string; phones?: CallFirstPhone[]; className?: string }) {
  return (
    <div className={`rounded-3xl bg-honey/20 p-5 ring-1 ring-honey/50 ${className}`}>
      <p className="font-display text-lg font-bold text-cocoa">📞 แนะนำให้โทรสอบถามก่อนมา</p>
      <p className="mt-1 text-sm leading-relaxed text-cocoa/80">{text}</p>
      {phones.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {phones.map((p) => (
            <a
              key={p.phone}
              href={`tel:${p.phone}`}
              className="inline-flex items-center gap-2 rounded-full bg-sky px-4 py-2 text-sm font-semibold text-white shadow-md shadow-sky/30 hover:bg-sky-deep"
            >
              📞 {p.label && <span className="font-normal text-white/90">{p.label}</span>} {p.phoneDisplay}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
