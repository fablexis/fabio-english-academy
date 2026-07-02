import React, { useEffect, useRef, useState } from 'react';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/** Progressive image: blurred and slightly scaled until loaded. */
const BlurImage: React.FC<BlurImageProps> = ({ src, alt, style, onLoad, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Under Astro the <img> is server-rendered, so it may already be fully
  // loaded by the time this island hydrates — meaning the native `load` event
  // fired before React attached `onLoad`. Detect that on mount so the blur
  // still clears instead of getting stuck.
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, [src]);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
      style={{
        filter: loaded ? 'blur(0px)' : 'blur(16px)',
        transform: loaded ? 'scale(1)' : 'scale(1.04)',
        transition: 'filter 0.7s ease, transform 0.7s ease',
        ...style,
      }}
      {...rest}
    />
  );
};

export default BlurImage;
