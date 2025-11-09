"use client";
import { getUserOrder } from "@/api/getUserOrder";
import type { CartItem, Order, Orders } from "@/types/orders.type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { toast } from "sonner";

export default function Orders() {
  const [orders, setOrders] = useState<Orders | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response: Orders = await getUserOrder();
        setOrders(response);
      } catch (error) {
        toast.error("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center bg-slate-50 p-10 rounded-xl shadow-md border border-slate-200">
          <p className="text-slate-600 text-lg md:text-xl font-medium">
            No orders found.
          </p>
          <p className="text-slate-400 mt-2">
            Looks like you have not placed any orders yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full lg:w-[80%] mx-auto my-10 px-5 md:px-0">
      {orders.map((order: Order) => (
        <div
          key={order._id}
          className="border p-5 mb-8 rounded-lg shadow-sm bg-white border-slate-300"
        >
          <div className="flex flex-wrap border-b pb-3 mb-3 border-slate-300">
            {order.cartItems.map((item: CartItem) => (
              <div key={item._id} className="w-1/2 md:w-1/4 p-2 mb-3">
                <div className="text-slate-700">
                  <Image
                    src={item.product.imageCover}
                    alt={item.product.title}
                    width={120}
                    height={120}
                    className="object-cover rounded-md"
                  />
                  <h3 className="line-clamp-1 mt-2">{item.product.title}</h3>
                  <p>Price: {item.price}</p>
                  <p>Quantity: {item.count}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between text-slate-500 gap-2">
            <h2>
              Total Price:{" "}
              <span className="font-semibold">{order.totalOrderPrice}</span>
            </h2>
            <p>Payment: {order.paymentMethodType}</p>
            <p>Address: {order.shippingAddress?.city}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
