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
    english: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    hindi: ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०'],
    arabic: ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠']
  };

  // Initialize particles
  useEffect(() => {
    const createParticle = (id: number): NumberParticle => {
      const languages: ('english' | 'hindi' | 'arabic')[] = ['english', 'hindi', 'arabic'];
      const language = languages[Math.floor(Math.random() * languages.length)];
      const numbers = numberMappings[language];
      
      return {
        id,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5, // Slower movement
        vy: (Math.random() - 0.5) * 0.5,
        number: numbers[Math.floor(Math.random() * numbers.length)],
        opacity: Math.random() * 0.3 + 0.1, // Very subtle opacity
        scale: Math.random() * 0.8 + 0.5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
        language
      };
    };

    // Create initial particles (fewer for subtlety)
    const initialParticles = Array.from({ length: 15 }, (_, i) => createParticle(i));
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
            opacity: Math.sin(Date.now() * 0.001 + particle.id) * 0.1 + 0.15 // Gentle pulsing
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
          className="absolute text-4xl font-bold select-none transition-opacity duration-1000"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
            color: particle.language === 'english' ? '#FF9933' : 
                   particle.language === 'hindi' ? '#E4B343' : '#F4C2C2',
            textShadow: '0 0 20px currentColor',
            fontFamily: particle.language === 'hindi' ? 'serif' : 
                       particle.language === 'arabic' ? 'serif' : 'inherit',
            filter: 'blur(0.5px)',
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