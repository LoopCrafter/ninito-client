import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import { Product } from "@/src/types/product";
import ClientSanitizer from "./ClientSanitizer";
import ProductComments from "./ProductComments";
import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { redirect } from "next/navigation";

type ProductTabProps = {
  productId: string;
};
const ProductTabs: React.FC<ProductTabProps> = async ({ productId }) => {
  const productDetail = await apiFetchServer<{ product: Product }>(
    `/products/${productId}`
  );
  const product = productDetail?.product;
  if (!product) {
    redirect("/products");
  }

  return (
    <Tabs defaultValue="description" className="w-full rtl">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="description">توضیحات کامل</TabsTrigger>
        <TabsTrigger value="specifications">مشخصات فنی</TabsTrigger>
        <TabsTrigger value="reviews">
          نظرات ({product.comments.length ?? 0})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ClientSanitizer html={product.description} />
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-8">
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">مشخصات فنی</h3>
          <div className="grid gap-4">
            {product.specs.map((spec) => {
              return (
                <div
                  key={spec.key}
                  className="flex justify-between py-3 border-b border-border/50 last:border-b-0"
                >
                  <span className="font-medium text-muted-foreground">
                    {spec.key}:
                  </span>
                  <span className="text-foreground text-left">
                    {spec.value}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-8">
        <ProductComments product={product} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductTabs;
