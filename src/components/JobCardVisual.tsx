type VisualKind = "ugc" | "call";

export function JobCardVisual({ kind }: { kind: VisualKind }) {
  return (
    <div className={`swipe-visual is-${kind}`} aria-hidden="true">
      {kind === "ugc" ? <UgcArt /> : <CallArt />}
    </div>
  );
}

function UgcArt() {
  return (
    <svg viewBox="0 0 360 112" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="112" fill="#f3f0ea" />
      <rect x="150" y="16" width="60" height="112" rx="14" fill="#16140f" />
      <rect x="155" y="21" width="50" height="102" rx="10" fill="#faf8f4" />
      <rect x="157" y="32" width="46" height="84" rx="7" fill="#eee8e0" />
      <rect x="167" y="24" width="18" height="4" rx="2" fill="#16140f" />
      <circle cx="164" cy="40" r="2.4" fill="#e05a4e" />
      <rect x="169" y="38.2" width="7" height="3.4" rx="1.7" fill="#d8d2c8" />
      <circle cx="194" cy="62" r="2.8" fill="#d8d2c8" />
      <circle cx="194" cy="74" r="2.8" fill="#e5dfd6" />
      <circle cx="194" cy="86" r="2.8" fill="#eee8e0" />
    </svg>
  );
}

function CallArt() {
  return (
    <svg viewBox="0 0 360 112" preserveAspectRatio="xMidYMid slice">
      <rect width="360" height="112" fill="#f3f0ea" />
      <rect x="150" y="16" width="60" height="112" rx="14" fill="#16140f" />
      <rect x="155" y="21" width="50" height="102" rx="10" fill="#faf8f4" />
      <rect x="167" y="24" width="18" height="4" rx="2" fill="#16140f" />
      <circle cx="180" cy="68" r="13" fill="none" stroke="#eadfd4" strokeWidth="1.2" />
      <circle cx="180" cy="68" r="8.5" fill="#e05a4e" />
      <g transform="translate(180 68) scale(0.32) translate(-12 -12)">
        <path
          d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
          fill="#fffefc"
        />
      </g>
    </svg>
  );
}
