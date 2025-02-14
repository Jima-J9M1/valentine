import React, { useState, useEffect } from 'react';
import { Heart, Stars, Music, Gift, Camera, Coffee, Sparkles, Calendar, MessageCircleHeart, Cake, Plane, PartyPopper, Rocket, Crown, Sparkle } from 'lucide-react';

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            transform: `scale(${Math.random() * 0.5 + 0.5})`
          }}
        >
          {Math.random() > 0.5 ? (
            <Heart className="w-4 h-4 text-red-400 opacity-50" fill="currentColor" />
          ) : (
            <Stars className="w-4 h-4 text-yellow-400 opacity-50" />
          )}
        </div>
      ))}
    </div>
  );
}

function Confetti() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            backgroundColor: ['#ff0000', '#ff69b4', '#ff1493', '#ff00ff', '#4b0082', '#ffd700', '#ff4500'][Math.floor(Math.random() * 7)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0'
          }}
        />
      ))}
    </div>
  );
}

function MemoryWall() {
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const memories = [
    { icon: Coffee, text: "Our first coffee date", detail: "You ordered a vanilla latte, I got an americano. We talked for hours!" },
    { icon: Camera, text: "That perfect sunset photo", detail: "Remember that golden hour at the beach? Pure magic!" },
    { icon: Calendar, text: "When we first met", detail: "It feels like yesterday, yet look how far we've come!" },
    { icon: MessageCircleHeart, text: "Our late night talks", detail: "3 AM conversations that made me fall for you more." },
    { icon: Cake, text: "Your birthday surprise", detail: "Your smile when you saw the cake made my day!" },
    { icon: Plane, text: "Our dream vacation", detail: "Planning our next adventure together!" },
    { icon: Music, text: "Our song played", detail: "That moment when our song came on the radio!" },
    { icon: Rocket, text: "Star gazing night", detail: "Counting shooting stars and making wishes." }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {memories.map((memory, index) => (
        <div
          key={index}
          className={`bg-pink-50 p-4 rounded-lg flex flex-col items-center gap-2 transform hover:scale-105 transition-transform cursor-pointer relative overflow-hidden
            ${selectedMemory === index ? 'ring-4 ring-red-400 shadow-lg' : ''}`}
          onClick={() => {
            setSelectedMemory(index);
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2/2.wav');
            audio.play().catch(() => {});
          }}
        >
          <memory.icon className={`w-6 h-6 text-red-400 transition-transform duration-300 ${selectedMemory === index ? 'scale-125' : ''}`} />
          <p className="text-sm text-gray-600 text-center font-medium">{memory.text}</p>
          {selectedMemory === index && (
            <div className="absolute inset-0 bg-white/95 p-4 flex items-center justify-center text-sm text-gray-700 animate-fade-in">
              {memory.detail}
            </div>
          )}
          <Sparkle className="absolute top-1 right-1 w-3 h-3 text-yellow-400 animate-twinkle" />
        </div>
      ))}
    </div>
  );
}

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const noButtonSize = Math.max(0.3, 1 - noCount * 0.1);
  const noButtonPosition = {
    transform: `scale(${noButtonSize}) translate(${Math.sin(noCount) * 100}px, ${Math.cos(noCount) * 50}px)`,
    position: 'relative' as const,
  };

  const valentineMessages = [
    "You make my heart skip a beat! 💓",
    "Every moment with you is magical ✨",
    "You're my perfect match! 🎯",
    "Together forever? 💑",
    "Let's never git reset our love! 💕"
  ];

  useEffect(() => {
    if (yesPressed) {
      const timer = setTimeout(() => setShowGift(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [yesPressed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % valentineMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNoClick = () => {
    setNoCount(prev => prev + 1);
    if (noCount > 3) setShowMessage(true);
    setIsShaking(true);
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/209/209.wav');
    audio.play().catch(() => {});
    setTimeout(() => setIsShaking(false), 500);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (noCount > 2) {
        const noButton = document.querySelector('.no-button');
        if (noButton) {
          const rect = noButton.getBoundingClientRect();
          const buttonCenter = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
          };
          
          const distance = Math.sqrt(
            Math.pow(e.clientX - buttonCenter.x, 2) +
            Math.pow(e.clientY - buttonCenter.y, 2)
          );

          if (distance < 100) {
            const angle = Math.atan2(e.clientY - buttonCenter.y, e.clientX - buttonCenter.x);
            const newX = Math.cos(angle + Math.PI) * 100;
            const newY = Math.sin(angle + Math.PI) * 100;
            setMousePosition({ x: newX, y: newY });
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [noCount]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex items-center justify-center p-4">
      <FloatingHearts />
      {yesPressed && <Confetti />}
      <div className="max-w-md w-full">
        {!yesPressed ? (
          <div className={`bg-white rounded-2xl p-8 shadow-xl text-center space-y-6 relative overflow-hidden ${isShaking ? 'animate-shake' : ''}`}>
            <Crown className="absolute top-2 left-2 w-6 h-6 text-yellow-400 animate-bounce" />
            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-yellow-400 animate-spin-slow" />
            <div className="flex justify-center">
              <Heart 
                className={`w-20 h-20 text-red-500 ${noCount > 2 ? 'animate-heartbeat' : 'animate-pulse'}`}
                fill={noCount > 2 ? "currentColor" : "none"}
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif">Be My Valentine?</h1>
            <p className="text-gray-600 italic animate-fade-in">
              {valentineMessages[currentStep]}
            </p>
            
            <div className="flex justify-center items-center gap-4 min-h-[100px]">
              <button
                onClick={() => {
                  setYesPressed(true);
                  const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/1/1.wav');
                  audio.play().catch(() => {});
                }}
                className="px-8 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 transform hover:scale-110 shadow-lg animate-bounce"
              >
                Yes! ❤️
              </button>
              
              <button
                style={{
                  ...noButtonPosition,
                  transform: `${noButtonPosition.transform} translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
                onClick={handleNoClick}
                className="no-button px-8 py-3 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-all duration-200 absolute"
              >
                {["No", "Really?", "Think again!", "Last chance!", "Pretty please?", "Don't do this!", "Change your mind?", "Are you sure?"][Math.min(noCount, 7)]}
              </button>
            </div>

            {showMessage && (
              <div className="text-sm text-red-500 animate-bounce">
                The "No" button is trying to escape! 🏃‍♂️
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center space-y-6">
            <div className="flex justify-center gap-2">
              <Heart className="w-16 h-16 text-red-500 animate-heartbeat" fill="currentColor" />
              <Stars className="w-16 h-16 text-yellow-400 animate-pulse" />
              <PartyPopper className="w-16 h-16 text-purple-500 animate-bounce" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 font-serif animate-fade-in">Yay! 🎉</h1>
            <p className="text-gray-600 animate-slide-up">
              You've made me the happiest person! I promise to make this Valentine's Day special for you. ❤️
            </p>
            
            <MemoryWall />

            {showGift && (
              <div className="mt-6 space-y-4 animate-fade-in">
                <Gift className="w-12 h-12 text-red-500 mx-auto animate-bounce" />
                <p className="text-sm text-gray-600">
                  I have a special surprise planned for you! 🎁
                </p>
                <div className="p-4 bg-pink-50 rounded-lg transform hover:scale-105 transition-duration-300">
                  <p className="text-red-600 font-medium">
                    Meet me at our favorite spot at sunset... 🌅
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;