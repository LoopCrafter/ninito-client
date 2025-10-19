import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { Product } from "@/src/types/product";
import { fakeApi } from "@/src/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BreadCrumbProps = {
  productId: string;
};

const BreadCrumb: React.FC<BreadCrumbProps> = async ({ productId }) => {
  const productDetail = await apiFetchServer<{ product: Product }>(
    `/products/${productId}`
  );
  const product = productDetail?.product;
  return (
    <nav className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground">
        <li>
          <Link href="/" className="hover:text-primary transition-colors">
            خانه
          </Link>
        </li>
        <li>
          <ArrowLeft className="h-4 w-4" />
        </li>
        <li>
          <Link
            href="/products"
            className="hover:text-primary transition-colors"
          >
            محصولات
          </Link>
        </li>
        <li>
          <ArrowLeft className="h-4 w-4" />
        </li>
        <li>
          <Link
            href={`/products?filter[category]=${product?.category.id}`}
            className="hover:text-primary transition-colors"
          >
            {product?.category.title}
          </Link>
        </li>
        <li>
          <ArrowLeft className="h-4 w-4" />
        </li>
        <li className="text-foreground font-medium">{product?.title}</li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
