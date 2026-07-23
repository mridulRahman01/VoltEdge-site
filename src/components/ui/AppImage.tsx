'use client';

import React, { useState, useCallback, memo } from 'react';
import Image from 'next/image';

interface AppImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  unoptimized?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

// Tiny 1x1 dark pixel as blur placeholder (base64 WebP)
const BLUR_DATA_URL =
  'data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoBAAEAAkA4JZQCdAEO/gHOAAD++P/////////////////////8AAAA';

const AppImage = memo(function AppImage({
  src,
  alt = 'VoltEdge Product Image',
  width,
  height,
  className = '',
  priority = false,
  quality = 80,
  placeholder,
  blurDataURL,
  fill = false,
  sizes,
  onClick,
  fallbackSrc = '/assets/images/no_image.png',
  loading,
  unoptimized,
  style,
  ...props
}: AppImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  // External URLs: let next/image optimize them (it converts to WebP automatically)
  // Only set unoptimized if explicitly passed
  const resolvedUnoptimized = unoptimized ?? false;

  const handleError = useCallback(() => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    }
  }, [hasError, imageSrc, fallbackSrc]);

  // Determine loading strategy
  const loadingProp = priority ? undefined : (loading ?? 'lazy');
  const resolvedPlaceholder = placeholder ?? (priority ? 'empty' : 'blur');
  const resolvedBlurDataURL = blurDataURL ?? BLUR_DATA_URL;

  const commonProps = {
    src: imageSrc,
    alt: alt || 'VoltEdge Image',
    className,
    quality,
    onError: handleError,
    onClick,
    style,
    unoptimized: resolvedUnoptimized,
    ...(priority ? { priority: true } : { loading: loadingProp }),
    ...(resolvedPlaceholder === 'blur'
      ? { placeholder: 'blur' as const, blurDataURL: resolvedBlurDataURL }
      : { placeholder: 'empty' as const }),
  };

  if (fill) {
    return (
      <Image
        {...commonProps}
        fill
        sizes={sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        {...(props as Record<string, unknown>)}
      />
    );
  }

  return (
    <Image
      {...commonProps}
      width={width || 400}
      height={height || 300}
      sizes={sizes}
      {...(props as Record<string, unknown>)}
    />
  );
});

AppImage.displayName = 'AppImage';

export default AppImage;
