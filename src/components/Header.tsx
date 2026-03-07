import { Calendar, HelpCircle } from 'lucide-react';
import { DailyChallenge } from '../data/dailyChallenges';
import { useState } from 'react';
import { HowToPlay } from './HowToPlay';

interface HeaderProps {
  dailyChallenge: DailyChallenge;
}

export function Header({ dailyChallenge }: HeaderProps) {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="text-center pt-4 pb-2 md:pt-5 md:pb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          <h1 className="text-white text-3xl md:text-4xl">🎬 CineQuiz</h1>
          <button
            onClick={() => setShowHelp(true)}
            className="text-purple-200 hover:text-white transition-colors"
            title="How to play"
          >
            <HelpCircle size={20} />
          </button>
        </div>
        <p className="text-purple-200 text-sm md:text-base">Daily Film Review Challenge</p>
        <div className="flex items-center justify-center gap-2 mt-1 text-purple-200 text-sm">
          <Calendar size={16} />
          <span>Challenge #{dailyChallenge.challengeNumber}</span>
        </div>
      </header>

      {showHelp && <HowToPlay onClose={() => setShowHelp(false)} />}
    </>
  );
}