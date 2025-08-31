import React, { useEffect, useState, useCallback } from 'react';
import { Phone, Mail, MessageSquare, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Image configuration remains unchanged...
const images = [
  {
    small: '/photos/IMG_2049.jpg',
    medium: '/photos/IMG_2049.jpg',
    large: '/photos/IMG_2049.jpg',
    alt: 'Maltese puppy hero shot'
  },
  {
    small: '/photos/IMG_1656.jpg',
    medium: '/photos/IMG_1656.jpg',
    large: '/photos/IMG_1656.jpg',
    alt: 'Adorable Maltese puppy looking at camera'
  },
  {
    small: '/photos/IMG_1666.jpg',
    medium: '/photos/IMG_1666.jpg',
    large: '/photos/IMG_1666.jpg',
    alt: 'Maltese puppy playing with toy'
  },
  {
    small: '/photos/IMG_1682.jpg',
    medium: '/photos/IMG_1682.jpg',
    large: '/photos/IMG_1682.jpg',
    alt: 'Maltese puppy resting'
  },
  {
    small: '/photos/IMG_1759.jpg',
    medium: '/photos/IMG_1759.jpg',
    large: '/photos/IMG_1759.jpg',
    alt: 'Maltese puppy portrait'
  },
  {
    small: '/photos/IMG_1771.jpg',
    medium: '/photos/IMG_1771.jpg',
    large: '/photos/IMG_1771.jpg',
    alt: 'Maltese puppy close-up'
  },
  {
    small: '/photos/IMG_1776.jpg',
    medium: '/photos/IMG_1776.jpg',
    large: '/photos/IMG_1776.jpg',
    alt: 'Maltese puppy outdoors'
  },
  {
    small: '/photos/IMG_1779.jpg',
    medium: '/photos/IMG_1779.jpg',
    large: '/photos/IMG_1779.jpg',
    alt: 'Maltese puppy playing'
  },
  {
    small: '/photos/IMG_1783.jpg',
    medium: '/photos/IMG_1783.jpg',
    large: '/photos/IMG_1783.jpg',
    alt: 'Maltese puppy sitting'
  },
  {
    small: '/photos/IMG_1802.jpg',
    medium: '/photos/IMG_1802.jpg',
    large: '/photos/IMG_1802.jpg',
    alt: 'Maltese puppy group'
  },
  {
    small: '/photos/IMG_1803.jpg',
    medium: '/photos/IMG_1803.jpg',
    large: '/photos/IMG_1803.jpg',
    alt: 'Maltese puppies together'
  },
  {
    small: '/photos/IMG_2045.jpg',
    medium: '/photos/IMG_2045.jpg',
    large: '/photos/IMG_2045.jpg',
    alt: 'Maltese puppy playing with toys'
  }
];

function calculateAge(startDate: Date): { weeks: number; days: number } {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  const days = diffDays % 7;
  return { weeks, days };
}

declare global {
  interface Window {
    gtag_report_conversion: (url?: string) => boolean;
  }
}

function App() {
  const [age, setAge] = useState({ weeks: 0, days: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean[]>(new Array(images.length).fill(false));
  const startDate = new Date('2024-12-13');
  const phoneNumber = '+12533574306';
  const emailAddress = 'Mariia@pnwmaltese.com';
  const defaultSmsText = "Hi, I'm interested in your Maltese puppies. Could you please provide more information?";

  const updateAge = useCallback(() => {
    setAge(calculateAge(startDate));
  }, []);

  useEffect(() => {
    updateAge();
    const interval = setInterval(updateAge, 1000 * 60 * 60 * 24); // Update daily
    return () => clearInterval(interval);
  }, [updateAge]);

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      switch (e.key) {
        case 'Escape':
          setSelectedImageIndex(null);
          break;
        case 'ArrowLeft':
          navigateImages('prev');
          break;
        case 'ArrowRight':
          navigateImages('next');
          break;
      }
    };

    if (selectedImageIndex !== null) {
      document.addEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyboard);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImageIndex]);

  const navigateImages = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    const newIndex = direction === 'next'
      ? (selectedImageIndex + 1) % images.length
      : (selectedImageIndex - 1 + images.length) % images.length;
    
    setSelectedImageIndex(newIndex);
  };

  const handleImageLoad = (index: number) => {
    setIsImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleContactClick = (url: string) => {
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion(url);
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="w-full max-w-[1950px] mx-auto bg-white shadow-2xl">
      {/* Hero Section */}
      <div className="relative w-full h-[calc(100vh-100px)] max-h-[800px] sm:max-h-[1000px]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={images[0].large}
            srcSet={`${images[0].small} 480w, ${images[0].medium} 800w, ${images[0].large} 1200w`}
            sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
            alt={images[0].alt}
            className="w-full h-full object-cover object-[center_40%]"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 drop-shadow-lg">
            Adorable Maltese Puppies
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center drop-shadow-lg">
            Looking for Their Forever Home!
          </h2>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Introduction */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                🐶 Adorable Maltese Puppies for Sale! 🏡
              </h2>
              <p className="text-xl text-gray-700 mb-4">
                We have <span className="font-semibold">4 girls and 3 boys</span> looking for their forever homes! ❤️
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location and Age */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Location & Age</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">📍 Location:</span>
                    Des Moines, WA
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">📅 Born on:</span>
                    December 13, 2024
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">🐾 Current Age:</span>
                    {age.weeks} weeks, {age.days} days old
                  </li>
                </ul>
              </div>

              {/* Parents Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Parents' Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">Dad:</span>
                    8 lbs
                  </li>
                  <li className="flex items-center">
                    <span className="font-semibold mr-2">Mom:</span>
                    10 lbs
                  </li>
                  <li className="text-gray-600 italic">No AKC Registration</li>
                </ul>
              </div>

              {/* Health Details */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">💉 Health Details</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    <span className="font-semibold">Vaccinated</span> – First two shots completed
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    <span className="font-semibold">Dewormed twice</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    Healthy, playful, and well-socialized
                  </li>
                </ul>
              </div>

              {/* What You Get */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">🏡 What You Get</h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    Loving and affectionate companions
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    Puppies that are pee pad trained
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✔️</span>
                    Vaccinated and dewormed
                  </li>
                </ul>
              </div>

              {/* Pricing */}
              <div className="md:col-span-2 bg-gray-50 rounded-xl p-6">
                <h3 className="text-2xl font-semibold mb-4">Pricing</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#007BFF] text-xl">Males:</span>
                    <span className="ml-2 text-xl">$1,300</span>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <span className="font-semibold text-[#FF69B4] text-xl">Females:</span>
                    <span className="ml-2 text-xl">$1,400</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="w-full max-w-[1800px] mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Photo Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className="aspect-square overflow-hidden rounded-lg cursor-pointer relative"
              onClick={() => setSelectedImageIndex(index)}
            >
              {!isImageLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <img
                src={image.small}
                srcSet={`${image.small} 480w, ${image.medium} 800w, ${image.large} 1200w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={image.alt}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                className={`w-full h-full object-cover transform hover:scale-105 transition-transform duration-300 ${
                  isImageLoaded[index] ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* To be continued... */}
      <div className="w-full bg-gray-50 py-12 text-center">
        <p className="text-xl text-gray-600 italic">To be continued...</p>
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={32} />
          </button>
          
          {/* Navigation Buttons */}
          <button
            className="fixed left-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-black/75 hover:bg-black/90 p-4 sm:p-6 rounded-r-xl backdrop-blur-sm shadow-lg z-50 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              navigateImages('prev');
            }}
            aria-label="Previous image"
          >
            <ChevronLeft size={32} className="drop-shadow-lg" />
          </button>
          
          <button
            className="fixed right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 focus:outline-none transition-colors duration-200 bg-black/75 hover:bg-black/90 p-4 sm:p-6 rounded-l-xl backdrop-blur-sm shadow-lg z-50 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              navigateImages('next');
            }}
            aria-label="Next image"
          >
            <ChevronRight size={32} className="drop-shadow-lg" />
          </button>

          {/* Image Container */}
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <img
              src={images[selectedImageIndex].large}
              alt={images[selectedImageIndex].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Floating Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-3 flex flex-row justify-around items-center">
          <div className="flex gap-4">
            <a
              href={`tel:${phoneNumber}`}
              onClick={(e) => {
                e.preventDefault();
                handleContactClick(`tel:${phoneNumber}`);
              }}
              className="flex flex-col items-center space-y-1 text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
              aria-label="Call us"
            >
              <Phone size={24} className="stroke-2" />
              <span className="text-sm font-medium">Call</span>
            </a>
            <a
              href={`sms:${phoneNumber}?body=${encodeURIComponent(defaultSmsText)}`}
              onClick={(e) => {
                e.preventDefault();
                handleContactClick(`sms:${phoneNumber}?body=${encodeURIComponent(defaultSmsText)}`);
              }}
              className="flex flex-col items-center space-y-1 text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              aria-label="Send SMS"
            >
              <MessageSquare size={24} className="stroke-2" />
              <span className="text-sm font-medium">Text</span>
            </a>
          </div>
          <a
            href={`mailto:${emailAddress}`}
            onClick={(e) => {
              e.preventDefault();
              handleContactClick(`mailto:${emailAddress}`);
            }}
            className="flex flex-col items-center space-y-1 text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            aria-label="Send Email"
          >
            <Mail size={24} className="stroke-2" />
            <span className="text-sm font-medium">Email</span>
          </a>
          <a
            href={`https://wa.me/${phoneNumber.replace('+', '')}`}
            onClick={(e) => {
              e.preventDefault();
              handleContactClick(`https://wa.me/${phoneNumber.replace('+', '')}`);
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1 text-[#25D366] hover:text-[#128C7E] p-2 rounded-lg hover:bg-[#25D366]/10 transition-colors duration-200"
            aria-label="Chat on WhatsApp"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
              <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
            </svg>
            <span className="text-sm font-medium">WhatsApp</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61572723344963"
            onClick={(e) => {
              e.preventDefault();
              handleContactClick("https://www.facebook.com/profile.php?id=61572723344963");
            }}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1 text-[#1877F2] hover:text-[#0C63D4] p-2 rounded-lg hover:bg-[#1877F2]/10 transition-colors duration-200"
            aria-label="Visit our Facebook Page"
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <span className="text-sm font-medium">Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;