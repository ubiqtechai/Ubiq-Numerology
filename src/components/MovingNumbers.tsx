import React, { useEffect, useState } from 'react';

interface NumberParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  number: string;
  opacity: number;
  scale: number;
  rotation: number;
  rotationSpeed: number;
  language: 'english' | 'hindi' | 'arabic';
}

const MovingNumbers = () => {
  const [particles, setParticles] = useState<NumberParticle[]>([]);

  // Number mappings for different languages
  const numberMappings = {
    english: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    hindi: ['१', '२', '३', '४', '५', '६', '७', '८', '९'],
    arabic: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  };

  // Check minimum distance between particles
  const checkDistance = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  // Generate position with minimum distance from existing particles
  const generatePosition = (existingParticles: NumberParticle[]): { x: number; y: number } => {
    const minDistance = 150; // Minimum distance between particles
    let attempts = 0;
    let x, y;

    do {
      x = Math.random() * (window.innerWidth - 100) + 50; // Keep away from edges
      y = Math.random() * (window.innerHeight - 100) + 50;
      attempts++;
    } while (
      attempts < 50 && 
      existingParticles.some(particle => 
        checkDistance(x, y, particle.x, particle.y) < minDistance
      )
    );

    return { x, y };
  };

  // Initialize particles
  useEffect(() => {
    const createParticle = (id: number): NumberParticle => {
      const languages: ('english' | 'hindi' | 'arabic')[] = ['english', 'hindi', 'arabic'];
      const language = languages[Math.floor(Math.random() * languages.length)];
      const numbers = numberMappings[language];
      
      return {
        id,
        x: 0, // Will be set by generatePosition
        y: 0, // Will be set by generatePosition
        vx: (Math.random() - 0.5) * 0.8, // Slightly faster movement
        vy: (Math.random() - 0.5) * 0.8,
        number: numbers[Math.floor(Math.random() * numbers.length)],
        opacity: Math.random() * 0.4 + 0.3, // Increased visibility (0.3-0.7)
        scale: Math.random() * 0.6 + 0.8, // Larger scale (0.8-1.4)
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.8,
        language
      };
    };

    // Create initial particles with proper spacing
    const initialParticles: NumberParticle[] = [];
    
    for (let i = 0; i < 20; i++) { // Increased from 15 to 20
      const particle = createParticle(i);
      const position = generatePosition(initialParticles);
      particle.x = position.x;
      particle.y = position.y;
      initialParticles.push(particle);
    }
    
    setParticles(initialParticles);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          let newX = particle.x + particle.vx;
          let newY = particle.y + particle.vy;
          let newVx = particle.vx;
          let newVy = particle.vy;

          // Collision detection with other particles
          particles.forEach(otherParticle => {
            if (otherParticle.id !== particle.id) {
              const distance = checkDistance(newX, newY, otherParticle.x, otherParticle.y);
              if (distance < 120) { // Minimum separation distance
                // Adjust velocity to move away
                const angle = Math.atan2(newY - otherParticle.y, newX - otherParticle.x);
                newVx += Math.cos(angle) * 0.1;
                newVy += Math.sin(angle) * 0.1;
              }
            }
          });

          // Bounce off edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newVx = -particle.vx;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          if (newY <= 0 || newY >= window.innerHeight) {
            newVy = -particle.vy;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: particle.rotation + particle.rotationSpeed,
            opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.15 + 0.45 // Enhanced pulsing (0.3-0.6)
          };
        })
      );
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          x: Math.min(particle.x, window.innerWidth),
          y: Math.min(particle.y, window.innerHeight)
        }))
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-5xl font-bold select-none transition-opacity duration-1000"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
            color: particle.language === 'english' ? '#FF9933' : 
                   particle.language === 'hindi' ? '#E4B343' : '#F4C2C2',
            textShadow: '0 0 30px currentColor, 0 0 60px currentColor',
            fontFamily: particle.language === 'hindi' ? 'serif' : 
                       particle.language === 'arabic' ? 'serif' : 'inherit',
            filter: 'blur(0.3px)',
            zIndex: -1
          }}
        >
          {particle.number}
        </div>
      ))}
    </div>
  );
};

export default MovingNumbers;