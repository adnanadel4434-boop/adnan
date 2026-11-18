interface BrandLogoProps {
  variant?: 'light' | 'dark';
  showMark?: boolean;
}

export function BrandLogo({ variant = 'dark', showMark = true }: BrandLogoProps) {
  const inkColor = variant === 'light' ? '#FBF8F1' : '#231811';
  const goldColor = '#B48A3E';
  const oliveColor = variant === 'light' ? '#7DA182' : '#2F4532';

  return (
    <span className="inline-flex items-center gap-3 whitespace-nowrap shrink-0 select-none">
      {showMark && (
        <svg
          width="34"
          height="34"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="shrink-0"
        >
          {/* Outer octagonal Rub el Hizb manuscript frame */}
          <rect
            x="7"
            y="7"
            width="26"
            height="26"
            rx="1.5"
            stroke={goldColor}
            strokeWidth="1.4"
          />
          <rect
            x="7"
            y="7"
            width="26"
            height="26"
            rx="1.5"
            transform="rotate(45 20 20)"
            stroke={goldColor}
            strokeWidth="1.4"
          />
          {/* Inner pointed Islamic arch */}
          <path
            d="M14.5 29V19.5C14.5 16 17 13 20 11.2C23 13 25.5 16 25.5 19.5V29"
            stroke={inkColor}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Manuscript baseline and subtle olive diamond */}
          <path d="M12.5 29H27.5" stroke={goldColor} strokeWidth="1.3" strokeLinecap="round" />
          <path
            d="M20 17L22.2 20L20 23L17.8 20L20 17Z"
            fill={oliveColor}
          />
        </svg>
      )}
      <span
        className="font-serif text-xl md:text-2xl font-bold tracking-normal whitespace-nowrap"
        style={{ color: inkColor }}
      >
        أثر المسلمين
      </span>
    </span>
  );
}
