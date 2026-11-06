import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/lib/hook";

export default function NavBar() {
  const [open, setOpen] = useState(false); // ბურგერ მენიუ (ტაბლეტი/ტელეფონი)
  const [userMenuOpen, setUserMenuOpen] = useState(false); // მომხმარებლის ჩამოსაშლელი (დესკტოპი)
  const userMenuRef = useRef(null);

  const user = useAppSelector((state) => state.user || {});
  const isLoggedIn = user.isLoggedIn || false;
  const name = user.name || "";

  const cartProducts = useAppSelector(
    (state) => state.cart?.cartProducts || [],
  );
  const cartCount = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  const close = () => {
    setOpen(false);
    setUserMenuOpen(false);
  };

  // ჩამოსაშლელი იხურება გარეთ დაწკაპუნებისას ან Escape-ზე
  useEffect(() => {
    if (!userMenuOpen) return;
    const onClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [userMenuOpen]);

  const linkClass =
    "text-sm font-medium text-gray-600 hover:text-black transition-colors";

  const avatar = (
    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white">
      {name ? name[0].toUpperCase() : "U"}
    </div>
  );

  // ბურგერ მენიუს (და გამოსული მომხმარებლის დესკტოპის) ბმულები
  const navLinks = (
    <>
      <Link to="/" onClick={close} className={linkClass}>
        Home
      </Link>

      <Link
        to="/cart"
        onClick={close}
        className={`relative group w-fit ${linkClass}`}
      >
        Cart
        {cartCount > 0 && (
          <span className="absolute -top-2.5 -right-3.5 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </Link>

      {isLoggedIn ? (
        <Link
          to="/profile"
          onClick={close}
          className="flex w-fit items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-all"
        >
          {avatar}
          <span className="text-sm font-semibold text-gray-800">
            {name || "Account"}
          </span>
        </Link>
      ) : (
        <Link
          to="/login"
          onClick={close}
          className="w-fit text-sm font-bold text-white bg-black px-6 py-2 rounded-full hover:bg-gray-800 transition-transform active:scale-95"
        >
          Log In
        </Link>
      )}
    </>
  );

  const itemClass =
    "flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors";

  // დესკტოპზე შესული მომხმარებლის ჩამოსაშლელი მენიუ
  const userDropdown = (
    <div className="relative" ref={userMenuRef}>
      <button
        type="button"
        onClick={() => setUserMenuOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={userMenuOpen}
        className="relative flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-all"
      >
        {avatar}
        <span className="text-sm font-semibold text-gray-800">
          {name || "Account"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
        {!userMenuOpen && cartCount > 0 && (
          <span className="absolute -top-1.5 -right-1 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {userMenuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-52 bg-white border border-gray-100 rounded-2xl shadow-lg py-2 overflow-hidden"
        >
          <Link to="/" role="menuitem" onClick={close} className={itemClass}>
            Home
          </Link>
          <Link
            to="/cart"
            role="menuitem"
            onClick={close}
            className={itemClass}
          >
            Cart
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Link
            to="/profile"
            role="menuitem"
            onClick={close}
            className={itemClass}
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
      <Link
        to="/"
        onClick={close}
        className="text-2xl font-black tracking-tighter text-black"
      >
        MY<span className="text-blue-600">STORE</span>
      </Link>

      {/* დესკტოპი (1024px-დან) */}
      <div className="hidden lg:flex items-center gap-8">
        {isLoggedIn ? userDropdown : navLinks}
      </div>

      {/* ბურგერ ღილაკი (1024px-ზე ქვემოთ) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="lg:hidden relative p-2 -mr-2 text-gray-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-7 h-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
        >
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
        {!open && cartCount > 0 && (
          <span className="absolute top-0.5 right-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* ბურგერის ჩამოშლილი პანელი */}
      {open && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-sm px-8 py-6 flex flex-col gap-5">
          {navLinks}
        </div>
      )}
    </nav>
  );
}
