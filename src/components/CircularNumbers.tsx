import React, { useEffect, useState } from 'react';

interface NumberPosition {
  id: number;
  x: number;
  y: number;
  angle: number;
  rotation: number;
  velocity: { x: number; y: number };
}

const CircularNumbers = () => {
  const [numbers, setNumbers] = useState<NumberPosition[]>([]);
  const containerSize = 500; // Increased container size
  const numberSize = 80; // Increased from 60 to 80
  const minDistance = 100; // Increased minimum distance

  // Initialize numbers in circular arrangement
  useEffect(() => {
    const centerX = containerSize / 2;
    const centerY = containerSize / 2;
    const radius = 150; // Increased radius for larger circle
    
    const initialNumbers: NumberPosition[] = [];
    
    for (let i = 1; i <= 9; i++) {
      const angle = (i - 1) * (360 / 9);
      const radian = (angle * Math.PI) / 180;
      
      initialNumbers.push({
        id: i,
        x: centerX + Math.cos(radian) * radius,
        y: centerY + Math.sin(radian) * radius,
        angle: angle,
        rotation: 0,
        velocity: { x: 0, y: 0 }
      });
    }
    
    setNumbers(initialNumbers);
  }, []);

  // Animation loop for rotation and collision detection
  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers(prevNumbers => {
        return prevNumbers.map(number => {
          // Independent rotation for each number
          const newRotation = (number.rotation + (number.id * 0.5)) % 360;
          
          // Slight orbital movement
          const newAngle = (number.angle + 0.2) % 360;
          const radian = (newAngle * Math.PI) / 180;
          const centerX = containerSize / 2;
          const centerY = containerSize / 2;
          const radius = 150 + Math.sin(Date.now() * 0.001 + number.id) * 15; // Increased variation
          
          let newX = centerX + Math.cos(radian) * radius;
          let newY = centerY + Math.sin(radian) * radius;
          
          // Collision detection with other numbers
          prevNumbers.forEach(otherNumber => {
            if (otherNumber.id !== number.id) {
              const dx = newX - otherNumber.x;
              const dy = newY - otherNumber.y;
              const distance = Math.sqrt(dx * dx + dy * dy);
              
              if (distance < minDistance) {
                // Push away from collision
                const pushX = (dx / distance) * (minDistance - distance) * 0.5;
                const pushY = (dy / distance) * (minDistance - distance) * 0.5;
                newX += pushX;
                newY += pushY;
              }
            }
          });
          
          return {
            ...number,
            x: newX,
            y: newY,
            angle: newAngle,
            rotation: newRotation
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative"
        style={{ width: containerSize, height: containerSize }}
      >
        {numbers.map((number) => (
          <div
            key={number.id}
            className="absolute flex items-center justify-center text-5xl font-bold text-gold/50 transition-all duration-100 select-none"
            style={{
              left: number.x - numberSize / 2,
              top: number.y - numberSize / 2,
              width: numberSize,
              height: numberSize,
              transform: `rotate(${number.rotation}deg)`,
              textShadow: '0 4px 12px rgba(228, 179, 67, 0.4), 0 2px 6px rgba(255, 153, 51, 0.3)',
              fontFamily: 'Georgia, serif',
              filter: 'drop-shadow(0 0 8px rgba(228, 179, 67, 0.2))'
            }}
          >
            {number.id}
          </div>
        ))}
        
        {/* Central focal point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-saffron/20 to-gold/20 border-2 border-gold/30 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default CircularNumbers;