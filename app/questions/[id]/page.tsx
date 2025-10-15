import { apiFetchServer } from "@/src/lib/apiFetch.server";
import DOMPurify from "isomorphic-dompurify";

type paramsType = {
  id: string;
};

type PageType = {
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

const CMSPage = async ({ params }: { params: paramsType }) => {
  const { id } = await params;
  const cmsRes = await apiFetchServer<{ page: PageType }>(`/pages/${id}`);
  const cleanHtml = DOMPurify.sanitize(cmsRes?.page.content || "");

  return (
    <section className="prose prose-sm sm:prose lg:prose-lg mx-auto px-20 py-10 text-gray-800 leading-relaxed">
      <div className="bg-white rounded-lg shadow-md p-10 pb-20 min-h-[80vh]">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {cmsRes?.page.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
      </div>
    </section>
  );
};

export default CMSPage;
