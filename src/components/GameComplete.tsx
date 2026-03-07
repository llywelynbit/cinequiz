import { FilmProgress, Film, getStars } from '../App';
import { Trophy, Share2, Calendar, Eye, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GameCompleteProps {
  filmsProgress: FilmProgress[];
  films: Film[];
  connection: string;
  connectionRevealed: boolean;
  onRevealConnection: () => void;
}

export function GameComplete({ filmsProgress, films, connection, connectionRevealed, onRevealConnection }: GameCompleteProps) {
  const [copied, setCopied] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('');
  
  const correctGuesses = filmsProgress.filter(p => p.state === 'won').length;
  const totalGuesses = filmsProgress.reduce((sum, p) => sum + p.guessCount, 0);
  const totalStars = filmsProgress.reduce((sum, p) => sum + getStars(p), 0);
  const maxStars = 20; // 4 stars × 5 films

  // Real-time countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown(); // Initial call
    const interval = setInterval(updateCountdown, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    const squares = filmsProgress.map(p => p.state === 'won' ? '🟩' : '🟥').join('');
    const starText = totalStars > 0 ? `⭐ ${totalStars}/${maxStars} stars\n` : '';
    const text = `CineQuiz Daily Challenge\n${squares}\n${starText}${correctGuesses}/5 films guessed`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-white/20">
      <div className="text-center mb-4">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-purple-500/20 mb-2">
          <Trophy className="text-purple-300" size={28} />
        </div>
        <h2 className="text-white text-xl md:text-2xl mb-1">Challenge Complete!</h2>
        <p className="text-purple-200 text-sm md:text-base">
          You guessed {correctGuesses} out of 5 films
        </p>
        {totalStars > 0 && (
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="text-yellow-200 text-sm">
              {totalStars}/{maxStars} Stars
            </span>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {films.map((film, index) => {
          const progress = filmsProgress[index];
          const isWon = progress.state === 'won';
          const stars = getStars(progress);
          
          return (
            <div
              key={film.id}
              className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-lg ${
                isWon
                  ? 'bg-green-500/20 border border-green-400/50'
                  : 'bg-red-500/20 border border-red-400/50'
              }`}
            >
              <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm md:text-base truncate">{film.title}</div>
                <div className={`text-xs ${isWon ? 'text-green-300' : 'text-red-300'}`}>
                  {isWon 
                    ? `✓ ${progress.guessCount} ${progress.guessCount === 1 ? 'try' : 'tries'}`
                    : '✗ Not guessed'
                  }
                </div>
              </div>
              {isWon && stars > 0 && (
                <div className="flex gap-0.5">
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-lg p-3 md:p-4 border-2 border-amber-400/50 mb-3">
        <h3 className="text-amber-200 text-sm md:text-base mb-2 flex items-center gap-2">
          🔗 The Connection
        </h3>
        {connectionRevealed ? (
          <p className="text-white text-sm md:text-base">{connection}</p>
        ) : (
          <button
            onClick={onRevealConnection}
            className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/50 text-amber-100 rounded-lg transition-colors text-sm"
          >
            <Eye size={14} />
            Reveal Connection
          </button>
        )}
      </div>

      <button
        onClick={handleShare}
        className="w-full px-4 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2 mb-3 text-sm md:text-base"
      >
        <Share2 size={18} />
        {copied ? 'Copied!' : 'Share Results'}
      </button>

      <div className="text-center text-purple-200 text-sm flex items-center justify-center gap-2">
        <Calendar size={14} />
        Next challenge in <span className="font-mono text-white">{timeRemaining}</span>
      </div>
    </div>
  );
}