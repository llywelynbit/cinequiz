import { Film } from '../App';
import { Users, Calendar, Clapperboard, Eye } from 'lucide-react';

interface CluesDisplayProps {
  film: Film;
  cluesRevealed: number;
  onRevealClue: () => void;
}

export function CluesDisplay({ film, cluesRevealed, onRevealClue }: CluesDisplayProps) {
  const clues = [
    {
      icon: <Calendar size={20} />,
      label: 'Release Date',
      value: film.releaseDate,
    },
    {
      icon: <Clapperboard size={20} />,
      label: 'Director',
      value: film.director,
    },
    {
      icon: <Users size={20} />,
      label: 'Cast',
      value: film.cast.join(', '),
    },
  ];

  const nextClueToReveal = clues[cluesRevealed];

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-purple-200 text-sm md:text-base">Clues ({cluesRevealed}/3)</h2>
        {cluesRevealed < 3 && (
          <button
            onClick={onRevealClue}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-500/30 hover:bg-purple-500/40 border border-purple-400/50 text-purple-100 rounded-lg transition-colors text-xs md:text-sm"
          >
            <Eye size={14} />
            <span className="hidden sm:inline">Reveal {nextClueToReveal.label}</span>
            <span className="sm:hidden">Reveal</span>
          </button>
        )}
      </div>
      <div className="space-y-2">
        {clues.map((clue, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 p-2.5 rounded-lg transition-all ${
              index < cluesRevealed
                ? 'bg-purple-500/20 text-white border border-purple-400/30'
                : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
            }`}
          >
            <div className={index < cluesRevealed ? 'text-purple-300' : 'text-gray-500'}>
              {clue.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs md:text-sm opacity-80">{clue.label}</div>
              <div className="text-sm md:text-base truncate">
                {index < cluesRevealed ? clue.value : '???'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}