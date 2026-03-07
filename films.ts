import { useState, useEffect, useRef } from 'react';
import { Search, Film } from 'lucide-react';
import { searchMovies, MovieSuggestion } from '../utils/movieSearch';

interface MovieAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}

export function MovieAutocomplete({ value, onChange, onSubmit, placeholder }: MovieAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<MovieSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showNoResults, setShowNoResults] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowNoResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.trim().length >= 2) {
        const results = await searchMovies(value);
        setSuggestions(results);
        setIsOpen(true);
        setShowNoResults(results.length === 0);
        setSelectedIndex(-1);
      } else {
        setSuggestions([]);
        setIsOpen(false);
        setShowNoResults(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 200);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleSelect = (suggestion: MovieSuggestion) => {
    onChange(suggestion.title);
    setIsOpen(false);
    setShowNoResults(false);
    setSuggestions([]);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        onSubmit();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex]);
        } else {
          onSubmit();
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setShowNoResults(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={wrapperRef} className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-200/50" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || "Search for a film..."}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-purple-200/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          autoComplete="off"
        />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-purple-900/95 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl max-h-64 overflow-y-auto">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <button
                key={suggestion.id}
                onClick={() => handleSelect(suggestion)}
                className={`w-full px-4 py-3 text-left hover:bg-white/10 transition-colors flex items-center gap-3 ${
                  index === selectedIndex ? 'bg-white/10' : ''
                } ${index !== suggestions.length - 1 ? 'border-b border-white/10' : ''}`}
              >
                <Film className="text-purple-300 shrink-0" size={16} />
                <div className="flex-1 min-w-0">
                  <div className="text-white truncate">{suggestion.title}</div>
                </div>
              </button>
            ))
          ) : showNoResults ? (
            <div className="px-4 py-3 text-center text-purple-200/70 text-sm">
              <p className="mb-1">No suggestions found</p>
              <p className="text-xs text-purple-300/50">You can still type and submit any film title</p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}