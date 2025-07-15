import { useState, useEffect, useRef } from 'react';

interface UseCounterAnimationOptions {
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export const useCounterAnimation = ({
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = '',
  prefix = ''
}: UseCounterAnimationOptions) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLElement>(null);

  // Intersection Observer to detect when element enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  // Counter animation logic
  useEffect(() => {
    if (!isVisible || hasAnimated) return;

    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

      if (now >= endTime) {
        setCount(end);
        setHasAnimated(true);
        return;
      }

      const progress = (now - startTime) / duration;
      // Easing function for smooth animation (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * end);
      
      setCount(currentCount);
      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [isVisible, end, duration, delay, hasAnimated]);

  const formattedValue = `${prefix}${count.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })}${suffix}`;

  return {
    ref: elementRef,
    value: formattedValue,
    isAnimating: isVisible && !hasAnimated
  };
};