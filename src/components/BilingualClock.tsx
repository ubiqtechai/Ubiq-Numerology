import React, { useState, useEffect } from 'react';
import { Globe, Clock } from 'lucide-react';

interface ClockProps {
  size?: number;
}

const BilingualClock: React.FC<ClockProps> = ({ size = 400 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');

  // English and Hindi number mappings
  const englishNumbers = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  const hindiNumbers = ['१२', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०', '११'];

  const currentNumbers = language === 'hindi' ? hindiNumbers : englishNumbers;

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate clock hand angles
  const getClockAngles = (time: Date) => {
    const hours = time.getHours() % 12;
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return {
      hour: (hours * 30) + (minutes * 0.5), // 30 degrees per hour + minute adjustment
      minute: minutes * 6, // 6 degrees per minute
      second: seconds * 6, // 6 degrees per second
    };
  };

  const angles = getClockAngles(currentTime);

  // Generate number positions around the clock
  const generateNumberPositions = () => {
    const radius = (size * 0.35); // Increased radius for better visibility
    const centerX = size / 2;
    const centerY = size / 2;

    return currentNumbers.map((number, index) => {
      const angle = (index * 30 - 90) * (Math.PI / 180); // Start from 12 o'clock position
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      return {
        number,
        x,
        y,
        angle: index * 30
      };
    });
  };

  const numberPositions = generateNumberPositions();

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'english' ? 'hindi' : 'english');
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Language Toggle */}
      <div className="flex items-center gap-4">
        <div className="glassmorphic rounded-full p-2 border-2 border-gold/30 shadow-xl bg-white/20 backdrop-blur-md">
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-lg ${
              language === 'english' 
                ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg transform scale-105' 
                : 'text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            <Globe className="w-5 h-5" />
            English
          </button>
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 font-semibold text-lg ${
              language === 'hindi' 
                ? 'bg-gradient-to-r from-saffron to-gold text-white shadow-lg transform scale-105' 
                : 'text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            <Globe className="w-5 h-5" />
            हिंदी
          </button>
        </div>
      </div>

      {/* Digital Time Display */}
      <div className="glassmorphic rounded-2xl p-6 border-2 border-gold/30 shadow-2xl bg-white/15 backdrop-blur-md">
        <div className="flex items-center gap-3 mb-2">
          <Clock className="w-6 h-6 text-saffron" />
          <span className="text-lg font-semibold text-cosmic-indigo">
            Current Time ({language === 'hindi' ? 'वर्तमान समय' : 'Current Time'})
          </span>
        </div>
        <div className="text-3xl font-bold text-cosmic-indigo text-center">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>

      {/* Analog Clock */}
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="drop-shadow-2xl"
          style={{ filter: 'drop-shadow(0 10px 30px rgba(26, 26, 64, 0.3))' }}
        >
          {/* Clock Face Background */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 20}
            fill="url(#clockGradient)"
            stroke="url(#borderGradient)"
            strokeWidth="4"
          />

          {/* Gradient Definitions */}
          <defs>
            <radialGradient id="clockGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.95)" />
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="100%" stopColor="rgba(249, 246, 242, 0.9)" />
            </radialGradient>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF9933" />
              <stop offset="50%" stopColor="#E4B343" />
              <stop offset="100%" stopColor="#F4C2C2" />
            </linearGradient>
            <linearGradient id="hourHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1A40" />
              <stop offset="100%" stopColor="#FF9933" />
            </linearGradient>
            <linearGradient id="minuteHandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1A1A40" />
              <stop offset="100%" stopColor="#E4B343" />
            </linearGradient>
          </defs>

          {/* Hour Markers */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30 - 90) * (Math.PI / 180);
            const innerRadius = size / 2 - 60;
            const outerRadius = size / 2 - 40;
            const x1 = size / 2 + innerRadius * Math.cos(angle);
            const y1 = size / 2 + innerRadius * Math.sin(angle);
            const x2 = size / 2 + outerRadius * Math.cos(angle);
            const y2 = size / 2 + outerRadius * Math.sin(angle);

            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FF9933"
                strokeWidth="3"
                strokeLinecap="round"
              />
            );
          })}

          {/* Minute Markers */}
          {Array.from({ length: 60 }, (_, i) => {
            if (i % 5 !== 0) { // Skip hour markers
              const angle = (i * 6 - 90) * (Math.PI / 180);
              const innerRadius = size / 2 - 50;
              const outerRadius = size / 2 - 40;
              const x1 = size / 2 + innerRadius * Math.cos(angle);
              const y1 = size / 2 + innerRadius * Math.sin(angle);
              const x2 = size / 2 + outerRadius * Math.cos(angle);
              const y2 = size / 2 + outerRadius * Math.sin(angle);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#E4B343"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.6"
                />
              );
            }
            return null;
          })}

          {/* Clock Hands */}
          {/* Hour Hand */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + (size * 0.25) * Math.cos((angles.hour - 90) * (Math.PI / 180))}
            y2={size / 2 + (size * 0.25) * Math.sin((angles.hour - 90) * (Math.PI / 180))}
            stroke="url(#hourHandGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ transition: 'all 0.5s ease-in-out' }}
          />

          {/* Minute Hand */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + (size * 0.35) * Math.cos((angles.minute - 90) * (Math.PI / 180))}
            y2={size / 2 + (size * 0.35) * Math.sin((angles.minute - 90) * (Math.PI / 180))}
            stroke="url(#minuteHandGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            style={{ transition: 'all 0.5s ease-in-out' }}
          />

          {/* Second Hand */}
          <line
            x1={size / 2}
            y1={size / 2}
            x2={size / 2 + (size * 0.4) * Math.cos((angles.second - 90) * (Math.PI / 180))}
            y2={size / 2 + (size * 0.4) * Math.sin((angles.second - 90) * (Math.PI / 180))}
            stroke="#FF9933"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: 'all 0.1s ease-in-out' }}
          />

          {/* Center Dot */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r="12"
            fill="url(#hourHandGradient)"
            stroke="#FFFFFF"
            strokeWidth="3"
          />
        </svg>

        {/* Numbers positioned around the clock */}
        <div className="absolute inset-0">
          {numberPositions.map((pos, index) => (
            <div
              key={`${language}-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out"
              style={{
                left: pos.x,
                top: pos.y,
                fontSize: '2rem',
                fontWeight: '800',
                color: '#1A1A40',
                textShadow: '0 2px 8px rgba(255, 153, 51, 0.4), 0 0 20px rgba(228, 179, 67, 0.3)',
                fontFamily: language === 'hindi' ? 'serif' : 'system-ui, -apple-system, sans-serif',
                zIndex: 10
              }}
            >
              {pos.number}
            </div>
          ))}
        </div>
      </div>

      {/* Language Indicator */}
      <div className="glassmorphic rounded-xl p-4 border border-gold/20 bg-white/10 backdrop-blur-md">
        <div className="text-center">
          <div className="text-sm text-cosmic-indigo/70 mb-1">
            {language === 'hindi' ? 'भाषा' : 'Language'}
          </div>
          <div className="text-lg font-bold text-saffron">
            {language === 'hindi' ? 'हिंदी संख्या' : 'English Numbers'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BilingualClock;