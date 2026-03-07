import { Quote } from 'lucide-react';

interface ReviewDisplayProps {
  review: string;
}

export function ReviewDisplay({ review }: ReviewDisplayProps) {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-lg p-3 md:p-4 border border-white/20 h-full">
      <div className="flex items-start gap-3">
        <Quote className="text-purple-300 flex-shrink-0" size={24} />
        <div>
          <h2 className="text-purple-200 mb-1.5 text-sm md:text-base">Film Review</h2>
          <p className="text-white text-sm md:text-base leading-relaxed italic">
            "{review}"
          </p>
        </div>
      </div>
    </div>
  );
}