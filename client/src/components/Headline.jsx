import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sprout, ShoppingCart, Brain, Leaf } from 'lucide-react';

const slides = [
  {
    title: "Welcome to Farm4Better",
    description: "Empowering local farmers in Pakistan with technology, resources, and market access.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&h=900&fit=crop&q=80",
    icon: Sprout,
    gradient: "from-green-600/95 via-green-500/90 to-emerald-600/95"
  },
  {
    title: "Direct Marketplace",
    description: "Connect farmers directly with buyers. Fresh produce, fair prices, zero middlemen.",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=900&fit=crop&q=80",
    icon: ShoppingCart,
    gradient: "from-emerald-600/95 via-green-500/90 to-green-600/95"
  },
  {
    title: "AI-Powered Smart Tools",
    description: "Detect crop diseases instantly and predict yields with cutting-edge AI technology.",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1600&h=900&fit=crop&q=80",
    icon: Brain,
    gradient: "from-green-500/95 via-emerald-500/90 to-green-600/95"
  },
  {
    title: "Sustainable Growth",
    description: "Optimize resources, increase profits, and build a sustainable future for farming.",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&h=900&fit=crop&q=80",
    icon: Leaf,
    gradient: "from-green-600/95 via-emerald-600/90 to-green-500/95"
  },
];

const Headline = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
    setTimeout(() => setIsAnimating(false), 700);
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
    setTimeout(() => setIsAnimating(false), 700);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const Icon = slides[current].icon;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
      {/* Background Images with Ken Burns Effect */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 ${
            index === current ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
          }`}
          style={{ 
            backgroundImage: `url(${slide.image})`,
            animation: index === current ? 'kenburns 20s ease-out infinite' : 'none'
          }}
        />
      ))}

      {/* Gradient Overlay with Animation */}
      <div 
        className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${slides[current].gradient} transition-all duration-1000`}
      />

      {/* Decorative Pattern Overlay */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12">
        {/* Icon with Animation */}
        <div className="mb-8 transform transition-all duration-700 animate-bounce">
          <div className="bg-white/20 backdrop-blur-sm p-6 rounded-full border-4 border-white/30 shadow-2xl">
            <Icon size={56} className="text-white" strokeWidth={2} />
          </div>
        </div>

        {/* Title with Stagger Animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 text-white drop-shadow-2xl leading-tight tracking-tight">
          <span className="inline-block animate-fadeInUp">{slides[current].title}</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-3xl lg:text-4xl text-white/95 max-w-4xl font-light leading-relaxed drop-shadow-xl animate-fadeInUp animation-delay-200">
          {slides[current].description}
        </p>

        {/* CTA Button */}
        {/* <button className="mt-12 px-10 py-5 bg-white text-green-600 font-bold text-xl rounded-full hover:bg-green-50 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/50 animate-fadeInUp animation-delay-400">
          Get Started Today
        </button> */}
      </div>

      {/* Navigation Buttons - Modern Design */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-6 md:left-12 transform -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl group z-20"
      >
        <ChevronLeft size={32} className="text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-6 md:right-12 transform -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-300 border border-white/20 shadow-xl group z-20"
      >
        <ChevronRight size={32} className="text-white group-hover:scale-110 transition-transform" strokeWidth={2.5} />
      </button>

      {/* Progress Dots - Enhanced */}
      <div className="absolute bottom-10 md:bottom-16 w-full flex justify-center items-center space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`transition-all duration-500 rounded-full ${
              index === current 
                ? "w-12 h-3 bg-white shadow-lg shadow-white/50" 
                : "w-3 h-3 bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrent(index);
                setTimeout(() => setIsAnimating(false), 700);
              }
            }}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 text-white/90 font-semibold text-lg backdrop-blur-sm bg-white/10 px-5 py-2 rounded-full border border-white/20 z-20">
        {current + 1} / {slides.length}
      </div>

      <style jsx>{`
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default Headline;