import { apiFetchServer } from "@/src/lib/apiFetch.server";
import { Suspense } from "react";
import CMSPage from "../_components/CMSPage";
import { CMSPageSkeleton } from "@/src/components/fallbacks/CMSPageSkeleton";

type paramsType = {
  id: string;
};

export type PageType = {
  title: string;
  slug: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
};

export async function generateMetadata({ params }: { params: paramsType }) {
  const { id } = await params;
  const cmsRes = await apiFetchServer<{ page: PageType }>(`/pages/${id}`);

  return {
    title: cmsRes?.page.metaTitle || cmsRes?.page.title,
    description: cmsRes?.page.metaDescription || "",
  };
}

export default async function PageWrapper({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return (
    <Suspense fallback={<CMSPageSkeleton />}>
      <CMSPage id={id} />
    </Suspense>
  );
}
