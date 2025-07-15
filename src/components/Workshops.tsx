import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Video, Filter } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

const Workshops = () => {
  const [filter, setFilter] = useState('all');
  const [timeLeft, setTimeLeft] = useState({});

  const workshops = [
    {
      id: 1,
      title: 'Master Numbers & Spiritual Awakening',
      description: 'Deep dive into 11, 22, 33 and their transformative power',
      date: '2025-01-25',
      time: '7:00 PM IST',
      duration: '2 hours',
      type: 'online',
      level: 'Advanced',
      instructor: 'Swami Ananda Bharti',
      price: '$47',
      spots: 12,
      totalSpots: 50,
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Karmic Debt Numbers Workshop',
      description: 'Understanding 13, 14, 16, 19 and breaking karmic patterns',
      date: '2025-01-28',
      time: '6:30 PM IST',
      duration: '2.5 hours',
      type: 'online',
      level: 'Intermediate',
      instructor: 'Dr. Meera Krishnan',
      price: '$67',
      spots: 8,
      totalSpots: 40,
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Business Name Numerology Intensive',
      description: 'Create powerful business names using sacred numerology',
      date: '2025-02-02',
      time: '10:00 AM IST',
      duration: '4 hours',
      type: 'in-person',
      level: 'Beginner',
      instructor: 'Rajesh Sharma',
      price: '$127',
      spots: 3,
      totalSpots: 25,
      location: 'Mumbai Ashram',
      image: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  // Calculate countdown for each workshop
  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = {};
      workshops.forEach(workshop => {
        const now = new Date().getTime();
        const workshopDate = new Date(workshop.date + ' ' + workshop.time).getTime();
        const difference = workshopDate - now;

        if (difference > 0) {
          newTimeLeft[workshop.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
          };
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredWorkshops = workshops.filter(workshop => {
    if (filter === 'all') return true;
    return workshop.type === filter || workshop.level.toLowerCase() === filter;
  });

  return (
    <section id="workshops" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cosmic-indigo mb-6">
            Join Our Live Workshops
          </h2>
          <p className="text-lg text-cosmic-indigo/70 max-w-2xl mx-auto">
            Experience transformative learning with master teachers in intimate, interactive sessions
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-full transition-all text-sm ${
              filter === 'all'
                ? 'bg-gradient-to-r from-saffron to-gold text-white'
                : 'glassmorphic text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            All Workshops
          </button>
          <button
            onClick={() => setFilter('online')}
            className={`px-5 py-2 rounded-full transition-all text-sm ${
              filter === 'online'
                ? 'bg-gradient-to-r from-saffron to-gold text-white'
                : 'glassmorphic text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            <Video className="w-3 h-3 inline mr-1" />
            Online
          </button>
          <button
            onClick={() => setFilter('in-person')}
            className={`px-5 py-2 rounded-full transition-all text-sm ${
              filter === 'in-person'
                ? 'bg-gradient-to-r from-saffron to-gold text-white'
                : 'glassmorphic text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            <MapPin className="w-3 h-3 inline mr-1" />
            In-Person
          </button>
          <button
            onClick={() => setFilter('beginner')}
            className={`px-5 py-2 rounded-full transition-all text-sm ${
              filter === 'beginner'
                ? 'bg-gradient-to-r from-saffron to-gold text-white'
                : 'glassmorphic text-cosmic-indigo hover:bg-white/20'
            }`}
          >
            Beginner
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredWorkshops.map((workshop) => (
            <div key={workshop.id} className="glassmorphic rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 scale-90">
              <div className="relative h-40 overflow-hidden">
                <img 
                  src={workshop.image} 
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                <div className="absolute top-3 left-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    workshop.type === 'online' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-purple-500 text-white'
                  }`}>
                    {workshop.type === 'online' ? '🌐 Online' : '📍 In-Person'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="bg-gradient-to-r from-saffron to-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
                    {workshop.level}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-cosmic-indigo mb-2">{workshop.title}</h3>
                <p className="text-cosmic-indigo/70 mb-3 text-sm">{workshop.description}</p>

                {/* Workshop Details */}
                <div className="grid grid-cols-2 gap-3 mb-3 text-xs text-cosmic-indigo/60">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(workshop.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workshop.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <AnimatedNumber end={workshop.spots} duration={1500} /> spots left
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {workshop.duration}
                  </div>
                </div>

                {workshop.location && (
                  <div className="flex items-center gap-1 mb-3 text-xs text-cosmic-indigo/60">
                    <MapPin className="w-3 h-3" />
                    {workshop.location}
                  </div>
                )}

                {/* Countdown Timer */}
                {timeLeft[workshop.id] && (
                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <p className="text-xs text-cosmic-indigo/70 mb-2">Starts in:</p>
                    <div className="flex justify-between text-center">
                      <div>
                        <div className="text-lg font-bold text-saffron">
                          <AnimatedNumber end={timeLeft[workshop.id].days} duration={1000} />
                        </div>
                        <div className="text-xs text-cosmic-indigo/60">Days</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-saffron">
                          <AnimatedNumber end={timeLeft[workshop.id].hours} duration={1000} />
                        </div>
                        <div className="text-xs text-cosmic-indigo/60">Hours</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-saffron">
                          <AnimatedNumber end={timeLeft[workshop.id].minutes} duration={1000} />
                        </div>
                        <div className="text-xs text-cosmic-indigo/60">Minutes</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-saffron">
                          <AnimatedNumber end={timeLeft[workshop.id].seconds} duration={1000} />
                        </div>
                        <div className="text-xs text-cosmic-indigo/60">Seconds</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-saffron">{workshop.price}</span>
                  <span className="text-xs text-cosmic-indigo/60">
                    with {workshop.instructor}
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-saffron to-gold text-white py-2 rounded-full font-semibold hover:shadow-xl transition-all text-sm">
                  📆 Reserve My Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workshops;