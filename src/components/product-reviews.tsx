"use client";

import { Star } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { calculateDate } from "../utils";
import NoComments from "./NoComments";
import { Comment } from "../types/product";

type ProductReviewsProps = {
  comments: Comment[];
};
export const ProductReviews: React.FC<ProductReviewsProps> = ({ comments }) => {
  const averageRating =
    comments.reduce((acc, review) => acc + review.rating, 0) / comments.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (star) => comments.filter((review) => review.rating === star).length
  );

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-muted/50 rounded-lg p-6">
        {comments.length > 0 ? (
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
                بر اساس {comments.length} نظر
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
                      style={{ width: `${(count / comments.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-muted-foreground w-8 text-left">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NoComments />
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {comments.map((review) => (
          <div
            key={review.id}
            className="border border-border rounded-lg p-6 space-y-4 bg-white shadow-md"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={review.user.avatar} />
                  <AvatarFallback>
                    {review.user.firstName.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">
                      {review.user.firstName ?? ""} {review.user.lastName ?? ""}
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {calculateDate(review.createdAt)}
                  </p>
                </div>
              </div>

              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>گزارش نظر</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
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
              </div>
              <h5 className="font-semibold text-foreground">{review.title}</h5>
            </div>

            {/* Review Content */}
            <p className="text-muted-foreground leading-relaxed">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {/* {reviews.length > 3 && !showMore && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowMore(true)}
            className="w-full md:w-auto"
          >
            نمایش {reviews.length - 3} نظر دیگر
          </Button>
        </div>
      )} */}
    </div>
  );
};
