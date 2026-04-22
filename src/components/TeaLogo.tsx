type Props = { size?: number; className?: string };

export function TeaLogo({ size = 48, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Tea Time"
    >
      <defs>
        <linearGradient id="cupGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7f1e3" />
          <stop offset="100%" stopColor="#e1d9c2" />
        </linearGradient>
        <linearGradient id="brewGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7fa263" />
          <stop offset="100%" stopColor="#3a5029" />
        </linearGradient>
      </defs>

      <path
        d="M18 68 C18 82, 78 82, 78 68"
        stroke="#f7f1e3"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      <path
        d="M20 40 H76 L72 70 Q72 80 60 80 H36 Q24 80 24 70 Z"
        fill="url(#cupGrad)"
        stroke="#3a5029"
        strokeWidth="2.5"
      />

      <path
        d="M76 46 Q88 46 88 58 Q88 68 76 70"
        fill="none"
        stroke="#3a5029"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <ellipse cx="48" cy="46" rx="26" ry="6" fill="url(#brewGrad)" />

      <path
        d="M48 38 C52 30, 58 26, 54 18 C62 22, 64 30, 58 36"
        fill="#7fa263"
        stroke="#3a5029"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d="M40 32 Q38 26 42 20 M48 30 Q46 24 50 18 M56 32 Q54 26 58 20"
        stroke="#cbd9b8"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
    </svg>
  );
}
