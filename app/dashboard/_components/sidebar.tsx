const Sidebar = () => (
  <div className="w-full bg-gradient-to-b from-sky-100 to-rose-100 p-6 rounded-xl shadow-lg h-full sticky top-4">
    <h2 className="text-xl font-bold mb-6 text-rose-600">داشبورد من</h2>
    <ul className="space-y-3">
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer">
        آدرس‌های من
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer">
        سفارشات من
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer">نظرات من</li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer font-semibold bg-sky-300">
        پروفایل کاربری من
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer">
        تنظیمات حساب کاربری
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer text-red-600">
        خروج
      </li>
    </ul>
  </div>
);

export default Sidebar;
