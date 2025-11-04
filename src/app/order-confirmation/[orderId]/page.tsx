"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
// @ts-ignore - Convex will generate this
import { api } from "../../../../convex/_generated/api";
import { Order } from "@/types";

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.orderId as string;
  const orderData = useQuery(api.orders.getOrderById, { orderId: orderId });

  const order: Order | null = orderData ? {
    id: orderData._id,
    orderId: orderData.orderId,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    shippingAddress: orderData.shippingAddress,
    items: orderData.items,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    tax: orderData.tax,
    total: orderData.total,
    status: orderData.status,
    createdAt: orderData.createdAt,
  } : null;

  const loading = orderData === undefined;

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-20 text-center">
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
        <p className="text-gray-600 mb-4">
          We couldn't find an order with that ID.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition-colors"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800">
                Order Confirmed!
              </h1>
              <p className="text-green-700">
                We've received your order and sent a confirmation email.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Order ID
            </h2>
            <p className="text-2xl font-bold text-orange-500">{order.orderId}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-6 pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">${order.shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (VAT)</span>
              <span className="font-semibold">${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-4 border-t">
              <span className="text-lg font-semibold">Grand Total</span>
              <span className="text-lg font-bold text-orange-500">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
          <div className="text-gray-700">
            <p className="font-medium">{order.customerName}</p>
            <p>{order.shippingAddress.street}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.zipCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => router.push("/")}
            className="bg-orange-500 text-white px-8 py-3 rounded font-semibold hover:bg-orange-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
