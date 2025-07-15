import React from 'react';
import { useCounterAnimation } from '../hooks/useCounterAnimation';

interface AnimatedNumberProps {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  children?: (value: string, isAnimating: boolean) => React.ReactNode;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
  children
}) => {
  const { ref, value, isAnimating } = useCounterAnimation({
    end,
    duration,
    delay,
    decimals,
    suffix,
    prefix
  });

  if (children) {
    return (
      <span ref={ref} className={className}>
        {children(value, isAnimating)}
      </span>
    );
  }

  return (
    <span 
      ref={ref} 
      className={`${className} ${isAnimating ? 'animate-pulse' : ''}`}
    >
      {value}
    </span>
  );
};

export default AnimatedNumber;