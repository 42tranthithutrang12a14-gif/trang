export function LogoIcon({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Book cover */}
      <rect x="5" y="3" width="26" height="30" rx="4" fill="#1565c0" />

      {/* Spine */}
      <rect x="5" y="3" width="6" height="30" rx="3" fill="#0d47a1" />

      {/* Spine binding dots */}
      <circle cx="8" cy="10" r="1.2" fill="#1565c0" />
      <circle cx="8" cy="18" r="1.2" fill="#1565c0" />
      <circle cx="8" cy="26" r="1.2" fill="#1565c0" />

      {/* Page lines */}
      <rect x="15" y="15" width="12" height="1.8" rx="0.9" fill="white" opacity="0.75" />
      <rect x="15" y="19.5" width="12" height="1.8" rx="0.9" fill="white" opacity="0.75" />
      <rect x="15" y="24" width="8" height="1.8" rx="0.9" fill="white" opacity="0.5" />

      {/* Balance scale — gold, top of page */}
      {/* Center pole */}
      <rect x="17.3" y="7" width="1.4" height="5" rx="0.7" fill="#f59e0b" />
      {/* Beam */}
      <rect x="12" y="7" width="12" height="1.2" rx="0.6" fill="#f59e0b" />
      {/* Left arm */}
      <rect x="12" y="7" width="1.2" height="3" rx="0.6" fill="#f59e0b" />
      {/* Right arm */}
      <rect x="22.8" y="7" width="1.2" height="3" rx="0.6" fill="#f59e0b" />
      {/* Left pan */}
      <rect x="11" y="10" width="3.2" height="1" rx="0.5" fill="#f59e0b" />
      {/* Right pan */}
      <rect x="21.8" y="10" width="3.2" height="1" rx="0.5" fill="#f59e0b" />
    </svg>
  );
}
