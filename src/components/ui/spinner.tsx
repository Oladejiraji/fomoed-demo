function Spinner({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>{`
        @keyframes spin-arc {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .spinner-arc {
          transform-origin: 14px 14px;
          animation: spin-arc 0.75s linear infinite;
        }
      `}</style>
      <circle cx="14" cy="14" r="12" stroke="#BBBBBB" strokeWidth="3.5" />
      <path
        className="spinner-arc"
        d="M14 2 A 12 12 0 0 1 24.39 8"
        stroke="#4A4A4A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export { Spinner };
