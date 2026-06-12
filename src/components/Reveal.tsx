import React from 'react';
import { motion } from 'motion/react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds to wait after entering the viewport. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  as?: 'div' | 'section' | 'li' | 'span';
}

/** Scroll-triggered entrance used by sections without bespoke choreography. */
const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  delay = 0,
  y = 28,
  as = 'div',
}) => {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
