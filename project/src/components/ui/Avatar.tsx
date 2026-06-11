import { HTMLAttributes, forwardRef } from 'react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16',
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className = '', src, alt = 'User avatar', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ${className}`}
        {...props}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
