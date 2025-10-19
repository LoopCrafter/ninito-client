import { ProductGallery } from "@/src/components/product-gallery";
import BreadCrumb from "./_components/BreadCrumb";
import ProductInfo from "./_components/ProductInfo";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { Product } from "@/src/types/product";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import ProductTabs from "./_components/ProductTabs";
import { BreadcrumbSkeleton } from "@/src/components/fallbacks/BreadcrumbSkeleton";
import ProductTopSection from "./_components/ProductTopSection";
import { ProductDetailSkeleton } from "@/src/components/fallbacks/ProductDetailSkeleton";
import ProductTabsSkeleton from "@/src/components/fallbacks/ProductTabsSkeleton";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<BreadcrumbSkeleton />}>
        <BreadCrumb productId={id} />
      </Suspense>

      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductTopSection productId={id} />
      </Suspense>
      <Suspense fallback={<ProductTabsSkeleton />}>
        <ProductTabs productId={id} />
      </Suspense>
    </div>
  );
}
