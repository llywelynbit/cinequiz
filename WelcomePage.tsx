import { Link, Eye, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface ConnectionClueProps {
  connection: string;
  revealed: boolean;
  onReveal: () => void;
}

export function ConnectionClue({ connection, revealed, onReveal }: ConnectionClueProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-lg rounded-lg border-2 border-amber-400/50">
      {/* Header - Always visible, clickable to expand/collapse */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-2.5 md:p-3 hover:bg-amber-500/10 transition-colors rounded-lg"
      >
        <div className="flex items-center gap-2">
          <Link className="text-amber-300 flex-shrink-0" size={20} />
          <h3 className="text-amber-200 text-sm md:text-base flex items-center gap-2">
            🔗 The Connection (4th Clue)
            <span className="text-xs bg-amber-500/30 px-2 py-0.5 rounded hidden sm:inline">Links all 5 films</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {!revealed && <Lock className="text-amber-400/50" size={16} />}
          {isExpanded ? (
            <ChevronUp className="text-amber-300" size={20} />
          ) : (
            <ChevronDown className="text-amber-300" size={20} />
          )}
        </div>
      </button>

      {/* Content - Only shown when expanded */}
      {isExpanded && (
        <div className="px-2.5 pb-2.5 md:px-3 md:pb-3 pt-0">
          {revealed ? (
            <p className="text-white text-sm md:text-base">
              {connection}
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-amber-100 text-xs md:text-sm">
                All 5 films in today's challenge share a common theme. Get at least one film correct to unlock this clue!
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReveal();
                }}
                className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/50 text-amber-100 rounded-lg transition-colors text-xs md:text-sm"
              >
                <Eye size={14} />
                Reveal Connection
              </button>
              <p className="text-green-300 text-xs italic">
                ✨ Revealing this clue doesn't cost a star!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}