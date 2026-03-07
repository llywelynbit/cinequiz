import { Send, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { MovieAutocomplete } from './MovieAutocomplete';
import { motion, AnimatePresence } from 'motion/react';
import { useRef } from 'react';

interface GuessInputProps {
  currentGuess: string;
  setCurrentGuess: (guess: string) => void;
  onSubmit: () => void;
  guessesRemaining: number;
  previousGuesses: string[];
  totalGuessesRemaining: number;
  wrongGuess?: boolean;
  lostHeart?: boolean;
}

export function GuessInput({
  currentGuess,
  setCurrentGuess,
  onSubmit,
  guessesRemaining,
  previousGuesses,
  totalGuessesRemaining,
  wrongGuess,
  lostHeart,
}: GuessInputProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20"
      animate={wrongGuess ? {
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.5 }
      } : {}}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-purple-200 text-sm md:text-base">Your Guess</h2>
        <div className="flex items-center gap-2 text-white relative">
          <Heart className="text-red-400" size={18} fill="currentColor" />
          <span className="text-sm md:text-base">× {totalGuessesRemaining}</span>
          
          {/* Floating heart animation when losing a heart */}
          <AnimatePresence>
            {lostHeart && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -30, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute -top-2 right-0"
              >
                <Heart className="text-red-400" size={18} fill="currentColor" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex gap-2 mb-2">
        <MovieAutocomplete
          value={currentGuess}
          onChange={setCurrentGuess}
          onSubmit={onSubmit}
          placeholder="Search for a film..."
        />
        <button
          onClick={onSubmit}
          disabled={!currentGuess.trim()}
          className="px-3 sm:px-4 py-2.5 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2 shrink-0"
        >
          <Send size={18} />
          <span className="hidden sm:inline">Submit</span>
        </button>
      </div>

      {previousGuesses.length > 0 && (
        <div>
          <div className="text-xs md:text-sm text-purple-200 mb-1.5">Previous Guesses</div>
          <div className="relative group">
            {/* Left arrow - desktop only */}
            <button
              onClick={() => scroll('left')}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-purple-900/80 hover:bg-purple-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {previousGuesses.map((guess, index) => (
                <div
                  key={index}
                  className="px-2.5 py-1 bg-red-500/30 border border-red-400/50 text-white rounded-full text-xs whitespace-nowrap shrink-0"
                >
                  {guess}
                </div>
              ))}
            </div>

            {/* Right arrow - desktop only */}
            <button
              onClick={() => scroll('right')}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-purple-900/80 hover:bg-purple-800 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}