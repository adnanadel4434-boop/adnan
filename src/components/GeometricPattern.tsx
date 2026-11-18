interface GeometricPatternProps {
  className?: string;
  opacity?: number;
}

export function GeometricPattern({ className = '', opacity = 0.08 }: GeometricPatternProps) {
  return (
    <div
      className={`pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="islamic-eightfold-star"
            width="96"
            height="96"
            patternUnits="userSpaceOnUse"
          >
            <g fill="none" stroke="#B48A3E" strokeWidth="1">
              {/* Interlocking 8-pointed star geometry */}
              <rect x="24" y="24" width="48" height="48" />
              <rect x="24" y="24" width="48" height="48" transform="rotate(45 48 48)" />
              <circle cx="48" cy="48" r="14" strokeOpacity="0.6" />
              <path d="M48 0V14M48 82V96M0 48H14M82 48H96" strokeOpacity="0.55" />
              <path d="M0 0L18 18M96 0L78 18M0 96L18 78M96 96L78 78" strokeOpacity="0.4" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-eightfold-star)" />
      </svg>
    </div>
  );
}
