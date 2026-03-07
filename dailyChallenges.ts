import { Film, Heart, Star, Link } from 'lucide-react';
import { useState } from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12 border border-white/20 text-center">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-purple-500/30 border-2 border-purple-400">
            <Film className="text-purple-300" size={40} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 bg-clip-text text-transparent">
            CineQuiz
          </h1>
          <p className="text-purple-200 text-lg md:text-xl mb-8">
            Guess the movie from the review!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 mb-8">
            <button
              onClick={onStart}
              className="w-full px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Playing
            </button>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all border border-white/20"
            >
              {showInstructions ? 'Hide Instructions' : 'How to Play'}
            </button>
          </div>

          {/* Instructions - Collapsible */}
          {showInstructions && (
            <div className="bg-white/5 rounded-lg p-6 text-left space-y-4 border border-white/10">
              <div className="flex items-start gap-3">
                <Film className="text-purple-300 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-purple-200 font-semibold mb-1">5 Films Daily</h3>
                  <p className="text-purple-100 text-sm">
                    Each day features 5 films to guess from their reviews.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Heart className="text-red-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-purple-200 font-semibold mb-1">Shared Life Pool</h3>
                  <p className="text-purple-100 text-sm">
                    You have 8 total guesses to use across all 5 films. Use them wisely!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-purple-200 font-semibold mb-1">3 Clues Per Film</h3>
                  <p className="text-purple-100 text-sm">
                    Reveal clues strategically: Release Date, Director, and Cast. Fewer clues = more stars!
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Link className="text-amber-300 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="text-purple-200 font-semibold mb-1">The Connection (FREE!)</h3>
                  <p className="text-purple-100 text-sm">
                    All 5 films share a theme. Unlock the 4th clue after guessing one film correctly! Best part: revealing it doesn't cost a guess or reduce your stars.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <p className="text-purple-100 text-sm">
                  💡 <strong>Pro Tip:</strong> The autocomplete search helps you find titles quickly. Plan your guesses carefully with the shared life pool!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}