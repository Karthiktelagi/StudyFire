export const Logo = ({ size = 'md', withText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 100 100"
        className={`${sizeClasses[size]} text-blue-600 dark:text-blue-400`}
        fill="currentColor"
      >
        {/* Book shape */}
        <path d="M 20 10 L 50 20 L 80 10 L 80 80 Q 50 90 20 80 Z" fill="currentColor" opacity="0.3" />
        
        {/* Main book pages */}
        <rect x="20" y="15" width="30" height="60" fill="currentColor" rx="2" />
        <rect x="52" y="15" width="28" height="60" fill="currentColor" opacity="0.6" rx="2" />
        
        {/* Spine */}
        <rect x="48" y="15" width="4" height="60" fill="currentColor" opacity="0.8" rx="1" />
        
        {/* Highlight/spark line */}
        <path
          d="M 30 30 Q 35 25 40 30 Q 35 35 30 30"
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Bottom accent */}
        <ellipse cx="50" cy="85" rx="28" ry="6" fill="currentColor" opacity="0.2" />
      </svg>

      {withText && (
        <div className="flex flex-col">
          <span className={`font-heading font-bold text-[var(--text-primary)] ${textSizeClasses[size]}`}>
            StudyFire
          </span>
        </div>
      )}
    </div>
  );
};
