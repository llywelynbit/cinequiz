import { useState, useEffect } from 'react';
import { FilmQuiz } from './components/FilmQuiz';
import { GameComplete } from './components/GameComplete';
import { Header } from './components/Header';
import { FilmSelector } from './components/FilmSelector';
import { ConnectionClue } from './components/ConnectionClue';
import { WelcomePage } from './components/WelcomePage';
import { getTodayChallenge, DailyChallenge } from './data/dailyChallenges';

export type FilmState = 'playing' | 'won' | 'lost';

export interface Film {
  id: number;
  title: string;
  review: string;
  cast: string[];
  releaseDate: string;
  director: string;
}

export interface FilmProgress {
  guessesRemaining: number;
  cluesRevealed: number;
  state: FilmState;
  guessCount: number;
  previousGuesses: string[];
}

export const getStars = (progress: FilmProgress): number => {
  if (progress.state !== 'won') return 0;
  if (progress.cluesRevealed === 0) return 4;
  if (progress.cluesRevealed === 1) return 3;
  if (progress.cluesRevealed === 2) return 2;
  return 1; // 3 clues revealed
};

export interface FilmResult {
  film: Film;
  progress: FilmProgress;
  stars: number;
}

export default function App() {
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge | null>(null);
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const [filmsProgress, setFilmsProgress] = useState<FilmProgress[]>([]);
  const [connectionRevealed, setConnectionRevealed] = useState(false);
  const [totalGuessesRemaining, setTotalGuessesRemaining] = useState(8);
  const [hasStarted, setHasStarted] = useState(false);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [lostHeart, setLostHeart] = useState(false);

  useEffect(() => {
    const challenge = getTodayChallenge();
    setDailyChallenge(challenge);
    
    // Check if user has already played today
    const savedState = localStorage.getItem(`cinequiz-${challenge.challengeNumber}`);
    if (savedState) {
      const state = JSON.parse(savedState);
      setFilmsProgress(state.filmsProgress);
      setConnectionRevealed(state.connectionRevealed);
      setSelectedFilmIndex(state.selectedFilmIndex || 0);
      setTotalGuessesRemaining(state.totalGuessesRemaining ?? 8);
      setHasStarted(true); // Skip welcome page if they've already played
    } else {
      // Initialize progress for all 5 films
      setFilmsProgress(Array(5).fill(null).map(() => ({
        guessesRemaining: 4, // Keep for backwards compatibility, but not used
        cluesRevealed: 0,
        state: 'playing' as FilmState,
        guessCount: 0,
        previousGuesses: [],
      })));
      setTotalGuessesRemaining(8);
    }
  }, []);

  const saveState = (progress: FilmProgress[], revealed: boolean, selectedIndex: number, totalGuesses: number) => {
    if (dailyChallenge) {
      localStorage.setItem(
        `cinequiz-${dailyChallenge.challengeNumber}`,
        JSON.stringify({
          filmsProgress: progress,
          connectionRevealed: revealed,
          selectedFilmIndex: selectedIndex,
          totalGuessesRemaining: totalGuesses,
        })
      );
    }
  };

  const handleGuess = (guess: string) => {
    if (!dailyChallenge) return;

    const currentProgress = filmsProgress[selectedFilmIndex];
    if (currentProgress.state !== 'playing') return;

    const currentFilm = dailyChallenge.films[selectedFilmIndex];
    const isCorrect = guess.toLowerCase().trim() === currentFilm.title.toLowerCase();

    const newProgress = [...filmsProgress];
    newProgress[selectedFilmIndex] = {
      ...currentProgress,
      guessCount: currentProgress.guessCount + 1,
      previousGuesses: [...currentProgress.previousGuesses, guess],
    };

    if (isCorrect) {
      newProgress[selectedFilmIndex].state = 'won';
      setFilmsProgress(newProgress);
      saveState(newProgress, connectionRevealed, selectedFilmIndex, totalGuessesRemaining);
    } else {
      // Trigger wrong guess animation
      setWrongGuess(true);
      setLostHeart(true);
      setTimeout(() => setWrongGuess(false), 500);
      setTimeout(() => setLostHeart(false), 600);

      const newTotalGuesses = totalGuessesRemaining - 1;
      setTotalGuessesRemaining(newTotalGuesses);

      // If out of guesses, mark all playing films as lost
      if (newTotalGuesses === 0) {
        newProgress.forEach((progress, index) => {
          if (progress.state === 'playing') {
            newProgress[index] = { ...progress, state: 'lost' };
          }
        });
      }

      setFilmsProgress(newProgress);
      saveState(newProgress, connectionRevealed, selectedFilmIndex, newTotalGuesses);
    }
  };

  const handleRevealClue = () => {
    const currentProgress = filmsProgress[selectedFilmIndex];
    if (currentProgress.cluesRevealed < 3) {
      const newProgress = [...filmsProgress];
      newProgress[selectedFilmIndex] = {
        ...currentProgress,
        cluesRevealed: currentProgress.cluesRevealed + 1,
      };
      setFilmsProgress(newProgress);
      saveState(newProgress, connectionRevealed, selectedFilmIndex, totalGuessesRemaining);
    }
  };

  const handleSelectFilm = (index: number) => {
    setSelectedFilmIndex(index);
    saveState(filmsProgress, connectionRevealed, index, totalGuessesRemaining);
  };

  const handleRevealConnection = () => {
    setConnectionRevealed(true);
    saveState(filmsProgress, true, selectedFilmIndex, totalGuessesRemaining);
  };

  if (!dailyChallenge || filmsProgress.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white">Loading today's challenge...</div>
      </div>
    );
  }

  // Show welcome page if user hasn't started yet
  if (!hasStarted) {
    return <WelcomePage onStart={() => setHasStarted(true)} />;
  }

  const hasAnyCorrectGuess = filmsProgress.some(p => p.state === 'won');
  const isGameComplete = filmsProgress.every(p => p.state !== 'playing');
  const currentFilm = dailyChallenge.films[selectedFilmIndex];
  const currentProgress = filmsProgress[selectedFilmIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-2 md:p-3">
      <div className="max-w-6xl mx-auto">
        <Header dailyChallenge={dailyChallenge} />

        {isGameComplete ? (
          <GameComplete
            filmsProgress={filmsProgress}
            films={dailyChallenge.films}
            connection={dailyChallenge.connection}
            connectionRevealed={connectionRevealed}
            onRevealConnection={handleRevealConnection}
          />
        ) : (
          <>
            <FilmSelector
              films={dailyChallenge.films}
              filmsProgress={filmsProgress}
              selectedIndex={selectedFilmIndex}
              onSelectFilm={handleSelectFilm}
              totalGuessesRemaining={totalGuessesRemaining}
            />

            {hasAnyCorrectGuess && (
              <div className="mb-2">
                <ConnectionClue
                  connection={dailyChallenge.connection}
                  revealed={connectionRevealed}
                  onReveal={handleRevealConnection}
                />
              </div>
            )}

            <FilmQuiz
              film={currentFilm}
              progress={currentProgress}
              onGuess={handleGuess}
              onRevealClue={handleRevealClue}
              totalGuessesRemaining={totalGuessesRemaining}
              wrongGuess={wrongGuess}
              lostHeart={lostHeart}
            />
          </>
        )}
      </div>
    </div>
  );
}