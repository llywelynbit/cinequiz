import { Film, FilmProgress, getStars } from '../App';
import { Check, X, Film as FilmIcon, Star } from 'lucide-react';

interface FilmSelectorProps {
  films: Film[];
  filmsProgress: FilmProgress[];
  selectedIndex: number;
  onSelectFilm: (index: number) => void;
  totalGuessesRemaining: number;
}

export function FilmSelector({ films, filmsProgress, selectedIndex, onSelectFilm, totalGuessesRemaining }: FilmSelectorProps) {
  return (
    <div className="mb-2">
      <h2 className="text-purple-200 text-sm md:text-base mb-1.5">Select a Film</h2>
      <div className="grid grid-cols-5 gap-2">
        {films.map((film, index) => {
          const progress = filmsProgress[index];
          const isSelected = selectedIndex === index;
          const isWon = progress.state === 'won';
          const isLost = progress.state === 'lost';
          const isPlaying = progress.state === 'playing';
          const stars = getStars(progress);

          return (
            <button
              key={film.id}
              onClick={() => onSelectFilm(index)}
              disabled={isLost && !isSelected}
              className={`
                relative p-2.5 rounded-lg border-2 transition-all
                ${isSelected 
                  ? 'border-purple-400 bg-purple-500/30 shadow-lg scale-105' 
                  : 'border-white/20 bg-white/10 hover:bg-white/20'
                }
                ${isLost && !isSelected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <div className="flex flex-col items-center gap-1.5">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${isWon ? 'bg-green-500/30 border-2 border-green-400' : ''}
                  ${isLost ? 'bg-red-500/30 border-2 border-red-400' : ''}
                  ${isPlaying ? 'bg-white/20' : ''}
                `}>
                  {isWon && <Check className="text-green-400" size={20} />}
                  {isLost && <X className="text-red-400" size={20} />}
                  {isPlaying && <FilmIcon className="text-white" size={20} />}
                </div>
                
                <div className="text-center">
                  <div className="text-white text-xs md:text-sm">Film {index + 1}</div>
                  {isWon && stars > 0 && (
                    <div className="flex justify-center gap-0.5 mt-0.5">
                      {Array.from({ length: stars }).map((_, i) => (
                        <Star key={i} className="text-yellow-400 fill-yellow-400" size={10} />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isSelected && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-purple-500 rounded-full border-2 border-purple-300 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}