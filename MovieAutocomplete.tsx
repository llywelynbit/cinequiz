import { X, Star } from 'lucide-react';

interface HowToPlayProps {
  onClose: () => void;
}

export function HowToPlay({ onClose }: HowToPlayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-lg p-8 max-w-2xl w-full border border-white/20 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-white text-3xl mb-6">How to Play</h2>

        <div className="space-y-4 text-purple-100">
          <div>
            <h3 className="text-white text-xl mb-2">🎯 Goal</h3>
            <p>Guess all 5 films from their reviews. Each day features a new challenge with 5 films connected by a theme!</p>
          </div>

          <div>
            <h3 className="text-white text-xl mb-2">🎮 How to Play</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Click any film to start - you can switch between films at any time!</li>
              <li>Read the film review carefully</li>
              <li>You have 12 total guesses across all 5 films - use them wisely!</li>
              <li>Reveal clues strategically to help you guess:
                <ul className="list-circle list-inside ml-6 mt-1">
                  <li>1st clue: Release Date</li>
                  <li>2nd clue: Director</li>
                  <li>3rd clue: Cast</li>
                </ul>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl mb-2 flex items-center gap-2">
              ⭐ Star Ratings
            </h3>
            <p className="mb-2">Earn stars based on how many clues you use:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li className="flex items-center gap-2">
                <span className="flex gap-0.5">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                </span>
                <span>Perfect! Solved without any clues</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex gap-0.5">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                </span>
                <span>Great! Solved with 1 clue</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex gap-0.5">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                </span>
                <span>Good! Solved with 2 clues</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="flex gap-0.5">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                </span>
                <span>Solved with all 3 clues</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl mb-2">🔗 The Connection</h3>
            <p>All 5 films share something in common. Get at least one film correct to unlock this bonus clue!</p>
          </div>

          <div>
            <h3 className="text-white text-xl mb-2">💡 Strategy Tips</h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Try to guess without clues first to earn 4 stars!</li>
              <li>Each clue you reveal costs you 1 star</li>
              <li>Switch between films if you get stuck</li>
              <li>Unlock the connection clue to help with remaining films</li>
              <li>Challenge yourself to earn all 20 stars (4 stars × 5 films)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-xl mb-2">📅 Daily Challenge</h3>
            <p>A new set of 5 films appears every day. Come back tomorrow for a fresh challenge!</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}