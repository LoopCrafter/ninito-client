import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { Product } from "@/src/types/product";
import ProductInfo from "./ProductInfo";
import { ProductGallery } from "@/src/components/product-gallery";

type ProductTopSectionProps = {
  productId: string;
};

const ProductTopSection: React.FC<ProductTopSectionProps> = async ({
  productId,
}) => {
  const productDetail = await apiFetchServer<{ product: Product }>(
    `/products/${productId}`
  );
  const product = productDetail?.product;

  return (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      <ProductInfo product={product} />
      <ProductGallery
        images={product?.galleryUrls ?? []}
        productName={product?.title ?? ""}
      />
    </div>
  );
};

export default ProductTopSection;
