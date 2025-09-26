import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

type Props = {
  review: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    comment: string;
    product: string;
  };
  totalReviews: number;
};
const ReviewCard: React.FC<Props> = ({ review, totalReviews }) => {
  return (
    <div
      key={review.id}
      className="px-3 bg-white border border-gray-100 rounded-xl"
    >
      <div className="bg-card rounded-2xl p-6 card-shadow h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-xl">
            {review.avatar}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold">{review.name}</h4>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < review.rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="text-muted-foreground mb-4 line-clamp-4">
          "{review.comment}"
        </p>

        {/* Product */}
        <div className="text-sm text-primary font-medium">
          خرید: {review.product}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
