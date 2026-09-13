type IconName =
  | 'chat'
  | 'quiz'
  | 'story'
  | 'fact'
  | 'map'
  | 'history'
  | 'sun'
  | 'earth'
  | 'moon'
  | 'rocket'
  | 'satellite'
  | 'station'
  | 'mars'
  | 'home'
  | 'parent'
  | 'star'
  | 'badge'
  | 'back'

const strokeA = '#2DD4BF'
const strokeB = '#38BDF8'

export function Icon({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = {
    fill: 'none',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  }

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      {name === 'chat' && (
        <>
          <path d="M7 9.5h18a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 25 22.5H14l-5 3v-3H7A2.5 2.5 0 0 1 4.5 20v-8A2.5 2.5 0 0 1 7 9.5z" stroke={strokeB} {...common} />
          <path d="M10 15h12M10 18.5h7" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'quiz' && (
        <>
          <path d="M8 26V8.5A2.5 2.5 0 0 1 10.5 6H22l5 5v15a2.5 2.5 0 0 1-2.5 2.5h-14A2.5 2.5 0 0 1 8 26z" stroke={strokeB} {...common} />
          <path d="M13 16.5l2.4 2.4L20.5 14" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'story' && (
        <>
          <path d="M7 8.5h8.5A3.5 3.5 0 0 1 19 12v14H10.5A3.5 3.5 0 0 1 7 22.5v-14z" stroke={strokeB} {...common} />
          <path d="M19 12h5.5A3.5 3.5 0 0 1 28 15.5v7A3.5 3.5 0 0 1 24.5 26H19" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'fact' && (
        <>
          <path d="M16 6v4M16 22v4M6 16h4M22 16h4M8.8 8.8l2.6 2.6M20.6 20.6l2.6 2.6M8.8 23.2l2.6-2.6M20.6 11.4l2.6-2.6" stroke={strokeA} {...common} />
          <circle cx="16" cy="16" r="4.2" stroke={strokeB} {...common} />
        </>
      )}
      {name === 'map' && (
        <>
          <circle cx="16" cy="16" r="10" stroke={strokeB} {...common} />
          <path d="M16 6.2c3 3.6 4.8 6.8 4.8 9.8a4.8 4.8 0 1 1-9.6 0c0-3 1.8-6.2 4.8-9.8z" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'history' && (
        <>
          <circle cx="16" cy="16" r="10" stroke={strokeB} {...common} />
          <path d="M16 10v6.4l4 2.2" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'sun' && (
        <>
          <circle cx="16" cy="16" r="5" stroke={strokeB} {...common} />
          <path d="M16 5v3M16 24v3M5 16h3M24 16h3M8.2 8.2l2.1 2.1M21.7 21.7l2.1 2.1M8.2 23.8l2.1-2.1M21.7 10.3l2.1-2.1" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'earth' && (
        <>
          <circle cx="16" cy="16" r="10" stroke={strokeB} {...common} />
          <path d="M7 14c3-1 6 2 9 1s6-4 9-2M10 21c3-2 6 0 8 0 3 0 5-2 7-1M16 6c2 4 2 16 0 20" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'moon' && (
        <>
          <path d="M19 7.2A9.5 9.5 0 1 0 24.8 20 8 8 0 0 1 19 7.2z" stroke={strokeB} {...common} />
          <circle cx="12.5" cy="15" r="1.1" stroke={strokeA} {...common} />
          <circle cx="16" cy="20.5" r="1.4" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'rocket' && (
        <>
          <path d="M16 5c5 6 8 11 8 16a8 8 0 1 1-16 0c0-5 3-10 8-16z" stroke={strokeB} {...common} />
          <circle cx="16" cy="18" r="2.2" stroke={strokeA} {...common} />
          <path d="M10 22.5L8 27l4.2-1.6M22 22.5L24 27l-4.2-1.6" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'satellite' && (
        <>
          <rect x="12" y="12" width="8" height="8" rx="1.5" stroke={strokeB} {...common} />
          <path d="M7 10l5 5M20 17l5 5M7 22l5-5M20 15l5-5M16 8v4M16 20v4" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'station' && (
        <>
          <rect x="10" y="12" width="12" height="8" rx="2" stroke={strokeB} {...common} />
          <path d="M6 16h4M22 16h4M8 12V9h3M21 12V9h3M13 20v3M19 20v3" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'mars' && (
        <>
          <circle cx="16" cy="17" r="8" stroke={strokeB} {...common} />
          <path d="M19 7.5l5-.2-.2 5M21.2 9.8c-2 1.2-3 3-3.2 5" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'home' && (
        <>
          <path d="M6 15L16 7l10 8" stroke={strokeB} {...common} />
          <path d="M9 14.5V24h14V14.5" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'parent' && (
        <>
          <circle cx="12" cy="11" r="3.2" stroke={strokeB} {...common} />
          <circle cx="21" cy="12.2" r="2.6" stroke={strokeA} {...common} />
          <path d="M6.5 23c.8-4 3-6 5.5-6s4.7 2 5.5 6M17 17.4c1.8 0 3.8 1.4 4.6 5.1" stroke={strokeB} {...common} />
        </>
      )}
      {name === 'star' && (
        <path d="M16 6.5l2.6 5.4 6 .8-4.3 4.2 1 5.9L16 20.2 10.7 22.8l1-5.9L7.4 12.7l6-.8z" stroke={strokeA} {...common} />
      )}
      {name === 'badge' && (
        <>
          <circle cx="16" cy="13" r="7" stroke={strokeB} {...common} />
          <path d="M12 19.2L10 26l6-3 6 3-2-6.8" stroke={strokeA} {...common} />
        </>
      )}
      {name === 'back' && (
        <path d="M18 8L10 16l8 8M10 16h13" stroke={strokeB} {...common} />
      )}
    </svg>
  )
}

export type { IconName }
