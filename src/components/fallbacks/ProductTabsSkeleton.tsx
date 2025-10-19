import { Tabs } from "@radix-ui/react-tabs";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const ProductTabsSkeleton = () => {
  return (
    <div className="w-full animate-pulse">
      <Tabs defaultValue="description" className="w-full rtl">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger disabled value="description">
            <Skeleton className="h-5 w-20 mx-auto" />
          </TabsTrigger>
          <TabsTrigger disabled value="specifications">
            <Skeleton className="h-5 w-20 mx-auto" />
          </TabsTrigger>
          <TabsTrigger disabled value="reviews">
            <Skeleton className="h-5 w-20 mx-auto" />
          </TabsTrigger>
        </TabsList>

        <div className="mt-6 bg-muted/40 h-64 rounded-xl">
          <Skeleton className="w-full h-full rounded-xl" />
        </div>
      </Tabs>
    </div>
  );
};

export default ProductTabsSkeleton;
