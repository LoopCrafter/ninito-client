import { useState } from "react";
import { Star, ThumbsUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
  productVariant?: string;
}

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    userId: "user1",
    userName: "مریم احمدی",
    rating: 5,
    title: "عالی و کیفیت بالا",
    comment:
      "واقعاً محصول فوق‌العاده‌ای است. کیفیت پارچه خیلی نرم و راحت است. نوزادم خیلی راحت در آن می‌خوابد. پیشنهاد می‌کنم.",
    date: "1403/02/15",
    helpful: 12,
    verified: true,
    productVariant: "آبی پاستیلی",
  },
  {
    id: "2",
    userId: "user2",
    userName: "سارا کریمی",
    rating: 4,
    title: "خوب اما قیمت کمی بالا",
    comment:
      "محصول خوبی است و کیفیت قابل قبولی دارد. فقط قیمتش کمی بالا به نظر می‌رسد. در کل راضی‌ام از خریدم.",
    date: "1403/02/10",
    helpful: 8,
    verified: true,
    productVariant: "صورتی پاستیلی",
  },
  {
    id: "3",
    userId: "user3",
    userName: "علی محمدی",
    rating: 5,
    title: "بهترین خرید",
    comment:
      "برای فرزند دومم خریدم و عالی بود. کیفیت پارچه فوق‌العاده و طراحی زیبا. حتماً دوباره از این فروشگاه خرید می‌کنم.",
    date: "1403/02/05",
    helpful: 15,
    verified: false,
    productVariant: "کرم",
  },
];

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [reviews] = useState<Review[]>(mockReviews);
  const [sortBy, setSortBy] = useState<"newest" | "helpful" | "rating">(
    "newest"
  );
  const [showMore, setShowMore] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "helpful":
        return b.helpful - a.helpful;
      case "rating":
        return b.rating - a.rating;
      case "newest":
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const displayedReviews = showMore ? sortedReviews : sortedReviews.slice(0, 3);

  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((review) => review.rating === star).length
  );

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted/50 rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center md:text-right">
            <div className="text-4xl font-bold text-foreground mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted-foreground">
              بر اساس {reviews.length} نظر
            </p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map((count, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-muted-foreground">{5 - index}</span>
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-border rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(count / reviews.length) * 100}%` }}
                  />
                </div>
                <span className="text-muted-foreground w-8 text-left">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">نظرات کاربران</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              مرتب‌سازی:{" "}
              {sortBy === "newest"
                ? "جدیدترین"
                : sortBy === "helpful"
                ? "مفیدترین"
                : "بالاترین امتیاز"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSortBy("newest")}>
              جدیدترین
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("helpful")}>
              مفیدترین
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("rating")}>
              بالاترین امتیاز
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div
            key={review.id}
            className="border border-border rounded-lg p-6 space-y-4"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.userName.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{review.userName}</h4>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        خرید تأیید شده
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>گزارش نظر</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Rating and Title */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {review.productVariant && (
                  <Badge variant="outline" className="text-xs">
                    {review.productVariant}
                  </Badge>
                )}
              </div>
              <h5 className="font-semibold text-foreground">{review.title}</h5>
            </div>

            {/* Review Content */}
            <p className="text-muted-foreground leading-relaxed">
              {review.comment}
            </p>

            {/* Review Actions */}
            <div className="flex items-center gap-4 pt-2">
              <Button variant="ghost" size="sm" className="gap-2 h-auto p-2">
                <ThumbsUp className="h-4 w-4" />
                مفید ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {reviews.length > 3 && !showMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowMore(true)}
            className="w-full md:w-auto"
          >
            نمایش {reviews.length - 3} نظر دیگر
          </Button>
        </div>
      )}
    </div>
  );
}
