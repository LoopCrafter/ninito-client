import { ProductReviews } from "@/src/components/product-reviews";
import { ReviewForm } from "@/src/components/review-form";
import { Product } from "@/src/types/product";
type ProductCommentsProps = {
  product: Product;
};
const ProductComments: React.FC<ProductCommentsProps> = ({ product }) => {
  return (
    <div className="space-y-8">
      <ReviewForm />
      <ProductReviews comments={product.comments ?? []} />
    </div>
  );
};

export default ProductComments;
