export function Mascot({ size = 168 }: { size?: number }) {
  return (
    <div className="mascot-float relative inline-block" style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label="小航宝">
        <defs>
          <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="visor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="178" rx="46" ry="8" fill="rgba(15,58,79,0.18)" />
        <path d="M68 128c-18 10-28 28-22 38 8 4 22-6 30-18" fill="url(#suit)" />
        <path d="M132 128c18 10 28 28 22 38-8 4-22-6-30-18" fill="url(#suit)" />
        <rect x="70" y="108" width="60" height="58" rx="22" fill="#F8FBFF" stroke="#7DD3FC" strokeWidth="3" />
        <circle cx="100" cy="78" r="42" fill="#F8FBFF" stroke="#67E8F9" strokeWidth="4" />
        <ellipse cx="100" cy="82" rx="28" ry="22" fill="url(#visor)" />
        <circle cx="90" cy="80" r="4.2" fill="#0F3A4F" />
        <circle cx="110" cy="80" r="4.2" fill="#0F3A4F" />
        <circle cx="91.2" cy="78.6" r="1.2" fill="#fff" />
        <circle cx="111.2" cy="78.6" r="1.2" fill="#fff" />
        <path d="M92 90c5 5 11 5 16 0" fill="none" stroke="#0F3A4F" strokeWidth="2.2" strokeLinecap="round" />
        <rect x="86" y="128" width="28" height="18" rx="6" fill="#A5B4FC" />
        <circle cx="100" cy="137" r="4" fill="#5EEAD4" />
        <path d="M148 92c12-18 28-8 22 10-10 4-18 2-22-10z" fill="#38BDF8" />
      </svg>
    </div>
  )
}
