import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type BreadCrumbProps = {
  category: string;
  productName: string;
};

const BreadCrumb: React.FC<BreadCrumbProps> = ({ category, productName }) => {
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
            href={`/products?category=${category}`}
            className="hover:text-primary transition-colors"
          >
            {category}
            {category}
          </Link>
        </li>
        <li>
          <ArrowLeft className="h-4 w-4" />
        </li>
        <li className="text-foreground font-medium">{productName}</li>
      </ol>
    </nav>
  );
};

export default BreadCrumb;
