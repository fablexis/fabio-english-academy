import React, { useState } from 'react';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

/** Progressive image: blurred and slightly scaled until loaded. */
const BlurImage: React.FC<BlurImageProps> = ({ src, alt, style, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoaded(true)}
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
