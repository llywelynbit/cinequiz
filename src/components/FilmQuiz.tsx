import { useState } from 'react';
import { Film, FilmProgress, getStars } from '../App';
import { ReviewDisplay } from './ReviewDisplay';
import { CluesDisplay } from './CluesDisplay';
import { GuessInput } from './GuessInput';
import { Trophy, X, Star } from 'lucide-react';

interface FilmQuizProps {
  film: Film;
  progress: FilmProgress;
  onGuess: (guess: string) => void;
  onRevealClue: () => void;
  totalGuessesRemaining: number;
  wrongGuess?: boolean;
  lostHeart?: boolean;
}

export function FilmQuiz({ film, progress, onGuess, onRevealClue, totalGuessesRemaining, wrongGuess, lostHeart }: FilmQuizProps) {
  const [currentGuess, setCurrentGuess] = useState('');

  const handleSubmit = () => {
    if (currentGuess.trim() && progress.state === 'playing') {
      onGuess(currentGuess);
      setCurrentGuess('');
    }
  };

  if (progress.state === 'won') {
    const stars = getStars(progress);
    
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-white/20 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-3 bg-green-500/20">
          <Trophy className="text-green-400" size={28} />
        </div>

        <h2 className="text-2xl md:text-3xl mb-2 text-green-400">
          Correct!
        </h2>

        {stars > 0 && (
          <div className="flex justify-center gap-1 mb-2">
            {Array.from({ length: stars }).map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
        )}

        {stars === 4 && (
          <div className="bg-yellow-500/20 border border-yellow-400/50 rounded-lg p-2 mb-3">
            <p className="text-yellow-200 text-sm">
              🎉 Perfect! Solved without any clues!
            </p>
          </div>
        )}

        <p className="text-white mb-4 text-sm md:text-base">
          You guessed the film in {progress.guessCount} {progress.guessCount === 1 ? 'try' : 'tries'}!
        </p>

        <div className="bg-white/10 rounded-lg p-4 text-left">
          <h3 className="text-purple-200 mb-2 text-sm">The film was:</h3>
          <div className="text-xl md:text-2xl text-white mb-3">{film.title}</div>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-purple-200">Director: </span>
              <span className="text-white">{film.director}</span>
            </div>
            <div>
              <span className="text-purple-200">Release Date: </span>
              <span className="text-white">{film.releaseDate}</span>
            </div>
            <div>
              <span className="text-purple-200">Cast: </span>
              <span className="text-white">{film.cast.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (progress.state === 'lost') {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 md:p-6 border border-white/20 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full mb-3 bg-red-500/20">
          <X className="text-red-400" size={28} />
        </div>

        <h2 className="text-2xl md:text-3xl mb-2 text-red-400">
          Out of Guesses
        </h2>

        <p className="text-white mb-4 text-sm md:text-base">
          You've used all your guesses!
        </p>

        <div className="bg-white/10 rounded-lg p-4 text-left">
          <h3 className="text-purple-200 mb-2 text-sm">The film was:</h3>
          <div className="text-xl md:text-2xl text-white mb-3">{film.title}</div>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-purple-200">Director: </span>
              <span className="text-white">{film.director}</span>
            </div>
            <div>
              <span className="text-purple-200">Release Date: </span>
              <span className="text-white">{film.releaseDate}</span>
            </div>
            <div>
              <span className="text-purple-200">Cast: </span>
              <span className="text-white">{film.cast.join(', ')}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-2 md:gap-3">
      {/* Left column: Review */}
      <div className="md:flex md:flex-col">
        <ReviewDisplay review={film.review} />
      </div>

      {/* Right column: Clues and Input */}
      <div className="space-y-2 md:flex md:flex-col">
        <CluesDisplay
          film={film}
          cluesRevealed={progress.cluesRevealed}
          onRevealClue={onRevealClue}
        />

        <GuessInput
          currentGuess={currentGuess}
          setCurrentGuess={setCurrentGuess}
          onSubmit={handleSubmit}
          guessesRemaining={progress.guessesRemaining}
          previousGuesses={progress.previousGuesses}
          totalGuessesRemaining={totalGuessesRemaining}
          wrongGuess={wrongGuess}
          lostHeart={lostHeart}
        />
      </div>
    </div>
  );
}