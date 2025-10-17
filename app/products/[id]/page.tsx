import { ProductGallery } from "@/src/components/product-gallery";
import { ProductReviews } from "@/src/components/product-reviews";
import { ReviewForm } from "@/src/components/review-form";
import { mockProduct } from "@/src/mock";
import BreadCrumb from "./_components/BreadCrumb";
import ProductInfo from "./_components/ProductInfo";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { Product } from "@/src/types/product";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductTabs from "./_components/ProductTabs";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const productDetail = await apiFetchServer<{ product: Product }>(
    `/products/${id}`
  );
  if (!productDetail?.product) {
    redirect("/products");
  }
  const product = productDetail?.product;
  return (
    <div className="container mx-auto px-4 py-8">
      {product ? (
        <>
          <BreadCrumb
            productName={product.title}
            category={product.category.title}
          />
          <Suspense fallback={<div>loading....</div>}>
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              <ProductInfo product={product} />
              <ProductGallery
                images={product.galleryUrls!}
                productName={product.title}
              />
            </div>
          </Suspense>

          {/* Product Details Tabs */}
          <ProductTabs product={product} />
        </>
      ) : (
        <h1>THERE IS NO PRODUCT</h1>
      )}
    </div>
  );
}
