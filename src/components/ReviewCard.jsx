import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="border-b border-[#E4E1D8] py-4 last:border-b-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-[#1A1A18]">
          {review.author}
        </span>
        <span className="text-xs text-neutral-400">{review.date}</span>
      </div>
      <div className="flex items-center gap-0.5 mb-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={13}
            className={
              i < review.rating
                ? "fill-[#FF6B35] text-[#FF6B35]"
                : "text-neutral-200"
            }
          />
        ))}
      </div>
      <p className="text-sm text-neutral-600 leading-relaxed">
        {review.text}
      </p>
    </div>
  );
}
