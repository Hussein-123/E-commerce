"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import getLoggedUserCart from "@/api/getUserCart";
import deleteCartItem from "@/api/deleteCartItem";
import Loading from "@/app/loading";
import { toast } from "sonner";
import updateCartProduct from "@/api/updateCartProduct";
import clearUserCart from "@/api/clearUserCart";
import { CartContext } from "@/context/CartContext";
import { CartProductType, CartType } from "@/types/cart.type";

export default function Cart() {
  const [cartInfo, setCartInfo] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [removeDisabled, setRemoveDisabled] = useState(false);
  const [removeAllItemsDisabled, setRemoveAllItemsDisabled] = useState(false);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [currentItemId, setCurrentItemId] = useState("");
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("Cart component must be used within CartContextProvider");
  }

  const { numberOfCartItems, setNumberOfCartItems } = cartContext;

  async function getUserCart() {
    try {
      const response = await getLoggedUserCart();
      if (response.status === "success") {
        console.log(response);
        setCartInfo(response);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function deleteItemFromCart(id: string) {
    setRemoveDisabled(true);
    setUpdateDisabled(true);
    try {
      const response = await deleteCartItem(id);
      if (response.status === "success") {
        toast.success("Item removed from cart");
        let sum = 0;
        response.data.products.forEach((product: CartProductType) => {
          sum += product.count;
        });
        setNumberOfCartItems(sum);
        await getUserCart();
      } else {
        toast.error("Failed to remove item");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRemoveDisabled(false);
      setUpdateDisabled(false);
    }
  }

  async function updateItemFromCart(id: string, count: string, sign: string) {
    setUpdateDisabled(true);
    setLoadingUpdate(true);
    setCurrentItemId(id);
    setRemoveDisabled(true);
    try {
      const response = await updateCartProduct(id, count);
      if (response.status === "success") {
        toast.success("Cart updated successfully");
        await getUserCart();
        if (sign === "+") {
          setNumberOfCartItems(numberOfCartItems + 1);
        } else if (sign === "-") {
          setNumberOfCartItems(numberOfCartItems - 1);
        }
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setUpdateDisabled(false);
      setLoadingUpdate(false);
      setRemoveDisabled(false);
    }
  }

  async function clearCart() {
    setRemoveAllItemsDisabled(true);
    try {
      const response = await clearUserCart();
      if (response.message === "success") {
        toast.success("Cart cleared successfully");
        await getUserCart();
        setNumberOfCartItems(0);
      } else {
        toast.error("Failed to clear cart");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setRemoveAllItemsDisabled(false);
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  if (loading) return <Loading />;

  return (
    <>
      {cartInfo?.data?.products && cartInfo.data.products.length > 0 ? (
        <div className="container w-full px-3 sm:px-4 md:w-[90%] lg:w-[80%] mx-auto">
          {/* ==== Desktop Table View ==== */}
          <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs uppercase bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="px-10 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartInfo.data.products.map((item: CartProductType) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <Image
                        src={item.product.imageCover}
                        width={150}
                        height={150}
                        alt={item.product.title}
                        className="rounded-lg object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          disabled={updateDisabled}
                          onClick={() => {
                            if (item.count > 1) {
                              updateItemFromCart(
                                item.product.id,
                                `${item.count - 1}`,
                                "-"
                              );
                            }
                          }}
                          className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-slate-500 bg-white border border-slate-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          {item.product.id === currentItemId ? (
                            loadingUpdate ? (
                              <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                              <span>{item.count}</span>
                            )
                          ) : (
                            <span>{item.count}</span>
                          )}
                        </div>
                        <button
                          disabled={updateDisabled}
                          onClick={() => {
                            updateItemFromCart(
                              item.product.id,
                              `${item.count + 1}`,
                              "+"
                            );
                          }}
                          className="cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-slate-500 bg-white border border-slate-500 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.price * item.count} EGP
                    </td>
                    <td className="px-6 py-4">
                      <Button
                        disabled={removeDisabled}
                        onClick={() => deleteItemFromCart(item.product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ==== Mobile Responsive Cards ==== */}
          <div className="md:hidden flex flex-col gap-3 mt-4">
            {cartInfo.data.products.map((item: CartProductType) => (
              <div
                key={item._id}
                className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.product.imageCover}
                      width={80}
                      height={80}
                      alt={item.product.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2 leading-tight">
                      {item.product.title}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-emerald-600 font-medium text-sm">
                        {item.price * item.count} EGP
                      </p>
                      <p className="text-gray-500 text-xs">
                        {item.price} EGP each
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          disabled={updateDisabled || item.count <= 1}
                          onClick={() => {
                            if (item.count > 1) {
                              updateItemFromCart(
                                item.product.id,
                                `${item.count - 1}`,
                                "-"
                              );
                            }
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-50 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 1h16"
                            />
                          </svg>
                        </button>

                        <span className="min-w-8 text-center font-medium text-gray-700">
                          {item.product.id === currentItemId &&
                          loadingUpdate ? (
                            <i className="fas fa-spinner fa-spin text-xs"></i>
                          ) : (
                            item.count
                          )}
                        </span>

                        <button
                          disabled={updateDisabled}
                          onClick={() => {
                            updateItemFromCart(
                              item.product.id,
                              `${item.count + 1}`,
                              "+"
                            );
                          }}
                          className="inline-flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-50 border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        disabled={removeDisabled}
                        onClick={() => deleteItemFromCart(item.product.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 disabled:opacity-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ==== Total Section ==== */}
          <div className="mt-6 sm:mt-8 bg-gradient-to-r from-slate-50 to-gray-50 p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex flex-col gap-4">
              <div className="text-center md:text-left">
                <p className="text-gray-700 text-base sm:text-lg flex items-center justify-center md:justify-start gap-2">
                  <span>Your Total:</span>
                  <span className="font-bold text-emerald-600 text-lg sm:text-xl">
                    {cartInfo.data.totalCartPrice} EGP
                  </span>
                </p>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  {cartInfo.data.products.length} item
                  {cartInfo.data.products.length !== 1 ? "s" : ""} in cart
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <Button
                  disabled={removeAllItemsDisabled}
                  onClick={() => clearCart()}
                  variant="outline"
                  className="w-full sm:flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 disabled:opacity-50 transition-colors cursor-pointer"
                >
                  Clear Cart
                </Button>

                <Link
                  href={`/checkout/${cartInfo.data._id}`}
                  className="w-full sm:flex-1"
                >
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 transition-colors cursor-pointer">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container w-full px-4 sm:w-[90%] md:w-[80%] lg:w-[60%] mx-auto">
          <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 sm:p-8 md:p-12 flex flex-col items-center gap-4 sm:gap-6 justify-center rounded-xl shadow-sm border border-gray-100 text-center min-h-[40vh]">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h7M9.5 18h7"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-md">
                Looks like you have not added anything to your cart yet. Start
                shopping to find amazing products!
              </p>
            </div>
            <Link href="/" className="mt-2">
              <Button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
