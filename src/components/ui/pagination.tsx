import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  hasNextPage,
  hasPrevPage,
  limit,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 5) return pages;

    const visiblePages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    if (start > 1) {
      visiblePages.push(1);
      if (start > 2) visiblePages.push("...");
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) visiblePages.push("...");
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6 py-4">
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrevPage}
          className={`px-2 sm:px-4 py-2 rounded-lg sm:rounded-2xl font-medium transition text-xs sm:text-sm ${
            hasPrevPage
              ? "bg-pink-200 text-pink-800 hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200 dark:hover:bg-pink-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
          }`}
        >
          <span className="hidden sm:inline">صفحه قبل</span>
          <span className="sm:hidden">قبل</span>
        </button>

        <div className="flex items-center gap-1">
          {visiblePages.map((p, index) =>
            p === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-2 py-1 text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p as number)}
                className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full font-medium transition text-xs sm:text-sm w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center ${
                  p === page
                    ? "bg-blue-500 text-white shadow-md dark:bg-blue-600"
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {(p as number).toLocaleString("fa-IR")}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNextPage}
          className={`px-2 sm:px-4 py-2 rounded-lg sm:rounded-2xl font-medium transition text-xs sm:text-sm ${
            hasNextPage
              ? "bg-pink-200 text-pink-800 hover:bg-pink-300 dark:bg-pink-800 dark:text-pink-200 dark:hover:bg-pink-700"
              : "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
          }`}
        >
          <span className="hidden sm:inline">صفحه بعد</span>
          <span className="sm:hidden">بعد</span>
        </button>
      </div>

      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 sm:hidden">
        صفحه {page.toLocaleString("fa-IR")} از{" "}
        {totalPages.toLocaleString("fa-IR")}
      </div>
    </div>
  );
};

export default Pagination;
