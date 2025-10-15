import Link from "next/link";
import Logout from "./Logout";

const Sidebar = () => (
  <div className="w-full bg-gradient-to-b from-sky-100 to-rose-100 rounded-xl shadow-lg h-full sticky top-4">
    <h2 className="text-xl font-bold text-rose-600 p-6">داشبورد من</h2>
    <ul className="transition duration-150 ease-in-out">
      <li className=" rounded hover:bg-sky-200 cursor-pointer px-6  py-3 duration-150 ease-in-out">
        <Link className="block" href="/dashboard/addresses">
          آدرس‌های من
        </Link>
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer transition duration-150 ease-in-out px-6 py-3">
        <Link className="block" href="/dashboard/orders">
          سفارشات من
        </Link>
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer transition duration-150 ease-in-out px-6 py-3">
        <Link className="block" href="/dashboard/comments">
          نظرات من
        </Link>
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer transition duration-150 ease-in-out px-6 py-3">
        <Link className="block" href="/dashboard/profile">
          پروفایل کاربری من
        </Link>
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer transition duration-150 ease-in-out px-6 py-3">
        <Link className="block" href="/dashboard/settings">
          تنظیمات حساب کاربری
        </Link>
      </li>
      <li className="p-2 rounded hover:bg-sky-200 cursor-pointer transition duration-150 ease-in-out px-6 py-3">
        <Logout />
      </li>
    </ul>
  </div>
);

export default Sidebar;
