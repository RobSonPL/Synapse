import React, { useState, useEffect, ImgHTMLAttributes } from 'react';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
}

export const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc,
  priority = false,
  className = '', 
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Compute WebP source and fallback sources
  const isWebp = src.endsWith('.webp');
  const webpSrc = isWebp ? src : src.replace(/\.(png|jpe?g)$/i, '.webp');
  const standardFallback = fallbackSrc || (isWebp ? src.replace(/\.webp$/i, '.png') : src);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => {
      if (fallbackSrc) {
        img.src = fallbackSrc;
      } else {
        setHasError(true);
        setIsLoaded(true);
      }
    };
  }, [src, fallbackSrc]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
      )}
      
      <picture className="w-full h-full">
        {/* Modern WebP stream */}
        <source type="image/webp" srcSet={webpSrc} />
        {/* Fallback image */}
        <img
          src={hasError && fallbackSrc ? fallbackSrc : src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            if (!hasError && fallbackSrc) {
              setHasError(true);
            }
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      </picture>
    </div>
  );
};
