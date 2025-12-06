"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import freshCartLogo from "../../../../public/images/freshcart-logo.svg";
import { signOut, useSession } from "next-auth/react";
import { LogOut, ShoppingCart, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartContext } from "@/context/CartContext";

export default function Navbar() {
  const path = usePathname();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const cartContext = useContext(CartContext);
  const numberOfCartItems = cartContext?.numberOfCartItems ?? 0;

  function handleLogout() {
    signOut({ callbackUrl: "/login" });
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/allorders", label: "Orders" },
  ];

  return (
    <nav className="bg-slate-100/80 backdrop-blur-md shadow-md fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="container w-full lg:w-[80%] mx-auto px-3 sm:px-4 py-3 sm:py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src={freshCartLogo}
            alt="FreshCart Logo"
            width={100}
            height={32}
            className="w-28 h-auto lg:w-[120px]"
          />
        </Link>

        {/* Icon for Mobile */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:hidden">
          {session && (
            <Link href="/cart" className="relative p-1 sm:p-2">
              <ShoppingCart className="cursor-pointer w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 hover:text-emerald-600 transition-colors" />
              {numberOfCartItems > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-emerald-600 text-white text-xs min-w-4 h-4 sm:min-w-5 sm:h-5 rounded-full flex items-center justify-center px-1">
                  {numberOfCartItems > 99 ? "99+" : numberOfCartItems}
                </span>
              )}
            </Link>
          )}
          {menuOpen ? (
            <X
              className="cursor-pointer text-slate-500 hover:text-slate-700 transition-colors"
              size={24}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="cursor-pointer text-slate-500 hover:text-slate-700 transition-colors"
              size={24}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-3 xl:gap-5 text-sm xl:text-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  path === link.href
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1 transition-all duration-200"
                    : "hover:text-emerald-600 transition-colors duration-200 pb-1"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-5">
          {!session ? (
            <ul className="flex gap-3 xl:gap-5 items-center text-sm xl:text-lg">
              <li>
                <Link
                  href="/register"
                  className={
                    path === "/register"
                      ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1 transition-all duration-200"
                      : "hover:text-emerald-600 transition-colors duration-200 pb-1"
                  }
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className={
                    path === "/login"
                      ? "text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-1 transition-all duration-200"
                      : "hover:text-emerald-600 transition-colors duration-200 pb-1"
                  }
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <Link
                href="/cart"
                className="relative p-2 rounded-full transition-all duration-200"
              >
                <ShoppingCart className="cursor-pointer w-5 h-5 xl:w-6 xl:h-6 hover:text-emerald-600 transition-colors" />
                {numberOfCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs min-w-5 h-5 rounded-full flex items-center justify-center px-1">
                    {numberOfCartItems > 99 ? "99+" : numberOfCartItems}
                  </span>
                )}
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 rounded-full transition-all duration-200 group"
                title="Logout"
              >
                <LogOut className="cursor-pointer w-5 h-5 xl:w-6 xl:h-6 hover:text-red-600 group-hover:scale-110 transition-all duration-200" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden bg-slate-100/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100 visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="border-t border-gray-200">
          <ul className="flex flex-col px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    path === link.href
                      ? "text-emerald-600 bg-emerald-50 font-semibold"
                      : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Auth Section Divider */}
            {!session ? (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      path === "/register"
                        ? "text-emerald-600 bg-emerald-50 font-semibold"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      path === "/login"
                        ? "text-emerald-600 bg-emerald-50 font-semibold"
                        : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                    }`}
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
