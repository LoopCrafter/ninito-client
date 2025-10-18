import { MessageSquare } from "lucide-react";

export default function NoComments() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center text-gray-600">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4 shadow-sm">
        <MessageSquare className="w-8 h-8 text-indigo-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        هنوز نظری ثبت نشده است
      </h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        اولین نفری باشید که دیدگاه خود را درباره‌ی این محصول به اشتراک می‌گذارد.
      </p>
    </div>
  );
}
