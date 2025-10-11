const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 mb-4 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9h14l-2-9M10 21h4"
        />
      </svg>

      <h2 className="text-lg font-medium">سبد خرید شما خالی است</h2>
      <p className="text-sm text-gray-400 mt-1">محصولی اضافه نشده است</p>
      <a
        href="/products"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        مشاهده محصولات
      </a>
    </div>
  );
};

export default EmptyCart;
