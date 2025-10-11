interface ErrorResponse {
  status: number;
  message: string;
  body?: any;
}

export function handleApiError(res: Response, responseData: any): never {
  const errorMessages: Record<number, string> = {
    400: "درخواست نامعتبر است. لطفاً اطلاعات خود را بررسی کنید.",
    401: "دسترسی شما منقضی شده است. لطفاً دوباره وارد شوید.",
    403: "شما اجازه‌ی دسترسی به این بخش را ندارید.",
    404: "موردی با این مشخصات یافت نشد.",
    408: "زمان درخواست شما به پایان رسید. دوباره تلاش کنید.",
    409: "درخواست تکراری است یا تداخلی رخ داده است.",
    413: "حجم داده‌های ارسال‌شده بیش از حد مجاز است.",
    415: "فرمت داده ارسالی پشتیبانی نمی‌شود.",
    422: "داده‌های واردشده معتبر نیستند.",
    429: "تعداد درخواست‌های شما بیش از حد مجاز است. لطفاً کمی بعد دوباره تلاش کنید.",
    500: "خطای داخلی سرور رخ داده است. لطفاً بعداً دوباره تلاش کنید.",
    502: "سرور موقتاً در دسترس نیست.",
    503: "سرور در حال بروزرسانی است. لطفاً لحظاتی بعد دوباره تلاش کنید.",
    504: "پاسخی از سرور دریافت نشد. لطفاً اتصال خود را بررسی کنید.",
  };

  const fallbackMessage =
    responseData?.message ||
    errorMessages[res.status] ||
    "خطایی غیرمنتظره رخ داده است. لطفاً بعداً دوباره تلاش کنید.";

  const error: ErrorResponse = {
    status: res.status,
    message: fallbackMessage,
    body: responseData,
  };

  const e = new Error(error.message);
  (e as any).status = error.status;
  (e as any).body = error.body;
  throw e;
}
