export function Starfield() {
  const stars = [
    [8, 12, 2, 0],
    [18, 28, 1.4, 0.6],
    [27, 9, 1.8, 1.2],
    [36, 22, 1.2, 0.3],
    [44, 8, 2.2, 1.8],
    [53, 31, 1.5, 0.9],
    [62, 14, 1.3, 1.5],
    [71, 26, 2, 0.2],
    [79, 11, 1.1, 2.1],
    [88, 20, 1.7, 0.7],
    [12, 40, 1.2, 1.1],
    [23, 48, 1.6, 0.4],
    [41, 42, 1.3, 1.6],
    [58, 50, 2.1, 0.8],
    [74, 44, 1.4, 2],
    [91, 38, 1.8, 0.5],
    [6, 62, 1.5, 1.4],
    [31, 68, 1.2, 0.1],
    [49, 60, 1.9, 1.9],
    [67, 70, 1.3, 0.6],
    [84, 64, 1.6, 1.3],
    [15, 78, 1.1, 2.2],
    [38, 82, 1.7, 0.35],
    [56, 76, 1.4, 1.7],
    [77, 84, 2, 0.95],
    [93, 74, 1.2, 1.1],
  ] as const

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#3d7ca8_0%,#2f6f96_38%,#1f5c82_72%,#184e72_100%)]" />
      <div className="absolute -top-24 left-1/2 h-[28rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(94,234,212,0.35),transparent_68%)]" />
      <div className="absolute top-24 right-[-4rem] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.28),transparent_70%)]" />
      <div className="absolute bottom-10 left-[-3rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.24),transparent_70%)]" />
      {stars.map(([x, y, s, delay], i) => (
        <span
          key={i}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            animationDelay: `${delay}s`,
            boxShadow: '0 0 8px rgba(255,255,255,0.8)',
          }}
        />
      ))}
      <span
        className="absolute left-0 top-1/4 h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent opacity-70"
        style={{ animation: 'shoot 11s linear infinite' }}
      />
    </div>
  )
}
