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
      <div className="container w-full lg:w-[80%] mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={freshCartLogo}
            alt="FreshCart Logo"
            width={120}
            height={40}
          />
        </Link>

        {/* Icon for Mobile */}
        <div className="flex items-center gap-4 lg:hidden">
          {session && (
            <Link href="/cart" className="relative">
              <ShoppingCart className="cursor-pointer" />
              {numberOfCartItems > 0 && (
                <span className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {numberOfCartItems}
                </span>
              )}
            </Link>
          )}
          {menuOpen ? (
            <X
              className="cursor-pointer text-slate-500"
              size={28}
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="cursor-pointer text-slate-500"
              size={28}
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-5 text-lg">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  path === link.href
                    ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                    : "hover:text-emerald-600"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="hidden lg:flex items-center gap-5">
          {!session ? (
            <ul className="flex gap-5 items-center text-lg">
              <li>
                <Link
                  href="/register"
                  className={
                    path === "/register"
                      ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                      : "hover:text-emerald-600"
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
                      ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                      : "hover:text-emerald-600"
                  }
                >
                  Login
                </Link>
              </li>
            </ul>
          ) : (
            <>
              <Link href="/cart" className="relative">
                <ShoppingCart className="cursor-pointer" />
                {numberOfCartItems > 0 && (
                  <span className="absolute -top-3 -right-3 bg-emerald-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {numberOfCartItems}
                  </span>
                )}
              </Link>
              <LogOut
                onClick={handleLogout}
                className="cursor-pointer hover:text-red-600 hover:scale-110 transition-all"
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-slate-100 shadow">
          <ul className="flex flex-col items-center gap-4 py-4 text-lg border-t border-gray-200">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={
                    path === link.href
                      ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                      : "hover:text-emerald-600"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!session ? (
              <>
                <li>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className={
                      path === "/register"
                        ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                        : "hover:text-emerald-600"
                    }
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className={
                      path === "/login"
                        ? "text-emerald-600 font-semibold border-b-2 border-emerald-600"
                        : "hover:text-emerald-600"
                    }
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-600 cursor-pointer"
                  >
                    <LogOut /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
