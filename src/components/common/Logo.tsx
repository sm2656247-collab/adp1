import React, { useState } from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'footer';
  className?: string;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  onClick,
  size = 'md',
}) => {
  const [imgError, setImgError] = useState(false);
  const isLight = variant === 'light' || variant === 'footer';

  const sizeClasses =
    size === 'sm'
      ? 'h-9 sm:h-10'
      : size === 'lg'
      ? 'h-16 sm:h-20'
      : 'h-11 sm:h-13 md:h-14';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-[1.02] ${className}`}
    >
      {!imgError ? (
        <img
          src="/src/assets/images/comfort_logo.png"
          alt="Comfort Ladies Garments"
          onError={() => setImgError(true)}
          className={`${sizeClasses} w-auto object-contain transition-all duration-300 ${
            isLight
              ? 'brightness-110 contrast-105 drop-shadow-[0_2px_8px_rgba(255,215,196,0.35)]'
              : 'drop-shadow-xs'
          }`}
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="flex items-center gap-2">
          {/* Fallback emblem */}
          <svg
            className={`w-7 h-7 ${isLight ? 'text-[#FFD7C4]' : 'text-[#B67B8D]'}`}
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M14 2C14 2 15.5 7.5 19 10C22.5 12.5 26 14 26 14C26 14 20.5 15.5 18 19C15.5 22.5 14 26 14 26C14 26 12.5 20.5 9 18C5.5 15.5 2 14 2 14C2 14 7.5 12.5 10 9C12.5 5.5 14 2 14 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="14" cy="14" r="2.5" fill="currentColor" fillOpacity="0.4" />
          </svg>
          <div className="flex flex-col items-center">
            <span
              className={`font-serif text-2xl sm:text-3xl font-medium tracking-[0.04em] ${
                isLight ? 'text-white' : 'text-[#5A3E36]'
              }`}
            >
              Comfort
            </span>
            <span
              className={`text-[9px] uppercase font-sans font-medium tracking-[0.32em] -mt-0.5 ${
                isLight ? 'text-[#FFD7C4]/90' : 'text-[#8A675E]'
              }`}
            >
              Ladies Garments
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

