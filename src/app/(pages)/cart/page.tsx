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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
        <div className="container w-[90%] md:w-[80%] mx-auto px-3">
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
          <div className="md:hidden flex flex-col gap-4 mt-4">
            {cartInfo.data.products.map((item: CartProductType) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-4"
              >
                <div className="flex justify-center">
                  <Image
                    src={item.product.imageCover}
                    width={150}
                    height={150}
                    alt={item.product.title}
                    className="rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-slate-800 text-base">
                    {item.product.title}
                  </h3>
                  <p className="text-slate-600 text-sm mt-1">
                    Price: {item.price * item.count} EGP
                  </p>
                  <p className="text-slate-600 text-sm mt-1">
                    Qty: {item.count}
                  </p>
                  <div className="flex items-center justify-between mt-3">
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
                      className="cursor-pointer inline-flex items-center justify-center h-7 w-7 text-slate-500 bg-white border border-slate-500 rounded-full hover:bg-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
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
                          <span className="text-slate-700 font-medium">
                            {item.count}
                          </span>
                        )
                      ) : (
                        <span className="text-slate-700 font-medium">
                          {item.count}
                        </span>
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
                      className="cursor-pointer inline-flex items-center justify-center h-7 w-7 text-slate-500 bg-white border border-slate-500 rounded-full hover:bg-gray-100"
                      type="button"
                    >
                      <svg
                        className="w-3 h-3"
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
                </div>

                <div className="mt-3">
                  <Button
                    disabled={removeDisabled}
                    onClick={() => deleteItemFromCart(item.product.id)}
                    className="w-full bg-red-500 hover:bg-red-600 text-white text-sm py-2 transition disabled:opacity-50 cursor-pointer"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ==== Total Section ==== */}
          <div className="mt-8 bg-slate-50 p-4 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-700 text-lg">
              <i className="fa-solid fa-sack-dollar text-emerald-600 text-xl"></i>{" "}
              Your Total:{" "}
              <span className="font-semibold">
                {cartInfo.data.totalCartPrice} EGP
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                disabled={removeAllItemsDisabled}
                onClick={() => clearCart()}
                className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white transition cursor-pointer disabled:opacity-50"
              >
                Delete All Items
              </Button>

              <Link href="">
                <Button className="w-full sm:w-auto cursor-pointer">
                  Next Step
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="container w-[90%] md:w-[80%] lg:w-[60%] mx-auto p-5 bg-slate-100 flex flex-col items-center gap-4 justify-center rounded-lg shadow-sm text-center">
          <h2 className="md:text-lg font-medium text-slate-700">
            Oops! Your cart is empty. Start shopping now by clicking below!
          </h2>
          <Link href="/">
            <Button className="cursor-pointer mt-2">Back to Home</Button>
          </Link>
        </div>
      )}
    </>
  );
}
