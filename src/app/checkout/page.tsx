"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation } from "convex/react";
// @ts-ignore - Convex will generate this
import { api } from "../../../convex/_generated/api";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  paymentMethod: z.enum(["eMoney", "cashOnDelivery"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
}).refine((data) => {
  if (data.paymentMethod === "eMoney") {
    return data.eMoneyNumber && data.eMoneyNumber.length >= 9;
  }
  return true;
}, {
  message: "e-Money number must be at least 9 digits",
  path: ["eMoneyNumber"],
}).refine((data) => {
  if (data.paymentMethod === "eMoney") {
    return data.eMoneyPin && data.eMoneyPin.length === 4;
  }
  return true;
}, {
  message: "e-Money PIN must be exactly 4 digits",
  path: ["eMoneyPin"],
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createOrder = useMutation(api.orders.createOrder);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch("paymentMethod");
  const subtotal = getTotalPrice();
  const shipping = 50; // Fixed shipping cost
  const tax = Math.round(subtotal * 0.08); // 8% tax
  const total = subtotal + shipping + tax;

  const onSubmit = async (data: CheckoutFormData) => {
    if (items.length === 0) {
      setSubmitError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Generate unique order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Save order to Convex
      await createOrder({
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        shippingAddress: {
          street: data.address,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        subtotal,
        shipping,
        tax,
        total,
        orderId,
      });

      // Send confirmation email
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: data.email,
          customerName: data.name,
          orderId,
          items,
          shippingAddress: {
            street: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            country: data.country,
          },
          subtotal,
          shipping,
          tax,
          total,
        }),
      });

      if (!emailResponse.ok) {
        console.error("Failed to send email, but order was saved");
      }

      // Clear cart and redirect
      clearCart();
      router.push(`/order-confirmation/${orderId}`);
    } catch (error) {
      console.error("Checkout error:", error);
      setSubmitError("Failed to process your order. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <p className="text-gray-600">Your cart is empty.</p>
        <a href="/" className="text-orange-500 hover:underline mt-4 inline-block">
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <a href="/" className="text-gray-600 hover:text-orange-500 mb-8 inline-block">
        Go Back
      </a>

      <h1 className="text-3xl font-bold mb-8">CHECKOUT</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-6 text-orange-500 uppercase">
              Billing Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.name ? "true" : "false"}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-6 text-orange-500 uppercase">
              Shipping Info
            </h2>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium mb-2">
                  Your Address
                </label>
                <input
                  id="address"
                  type="text"
                  {...register("address")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.address ? "true" : "false"}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium mb-2">
                    City
                  </label>
                  <input
                    id="city"
                    type="text"
                    {...register("city")}
                    className={`w-full px-4 py-2 border rounded ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={errors.city ? "true" : "false"}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium mb-2">
                    State
                  </label>
                  <input
                    id="state"
                    type="text"
                    {...register("state")}
                    className={`w-full px-4 py-2 border rounded ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={errors.state ? "true" : "false"}
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium mb-2">
                    ZIP Code
                  </label>
                  <input
                    id="zipCode"
                    type="text"
                    {...register("zipCode")}
                    className={`w-full px-4 py-2 border rounded ${
                      errors.zipCode ? "border-red-500" : "border-gray-300"
                    }`}
                    aria-invalid={errors.zipCode ? "true" : "false"}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-sm mt-1" role="alert">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  {...register("country")}
                  className={`w-full px-4 py-2 border rounded ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={errors.country ? "true" : "false"}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-lg font-semibold mb-6 text-orange-500 uppercase">
              Payment Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-4">
                  Payment Method
                </label>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border rounded cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      value="eMoney"
                      {...register("paymentMethod")}
                      className="mr-4"
                    />
                    <span>e-Money</span>
                  </label>
                  <label className="flex items-center p-4 border rounded cursor-pointer hover:border-orange-500">
                    <input
                      type="radio"
                      value="cashOnDelivery"
                      {...register("paymentMethod")}
                      className="mr-4"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "eMoney" && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="eMoneyNumber" className="block text-sm font-medium mb-2">
                      e-Money Number
                    </label>
                    <input
                      id="eMoneyNumber"
                      type="text"
                      {...register("eMoneyNumber")}
                      className={`w-full px-4 py-2 border rounded ${
                        errors.eMoneyNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="238521993"
                      aria-invalid={errors.eMoneyNumber ? "true" : "false"}
                    />
                    {errors.eMoneyNumber && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.eMoneyNumber.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="eMoneyPin" className="block text-sm font-medium mb-2">
                      e-Money PIN
                    </label>
                    <input
                      id="eMoneyPin"
                      type="text"
                      {...register("eMoneyPin")}
                      className={`w-full px-4 py-2 border rounded ${
                        errors.eMoneyPin ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="1234"
                      maxLength={4}
                      aria-invalid={errors.eMoneyPin ? "true" : "false"}
                    />
                    {errors.eMoneyPin && (
                      <p className="text-red-500 text-sm mt-1" role="alert">
                        {errors.eMoneyPin.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg sticky top-4">
            <h2 className="text-lg font-semibold mb-6 uppercase">Summary</h2>
            
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">TOTAL</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SHIPPING</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (INCLUDED)</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <span className="text-gray-600">GRAND TOTAL</span>
                <span className="font-semibold text-orange-500">${total.toFixed(2)}</span>
              </div>
            </div>

            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm" role="alert">
                {submitError}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Processing..." : "CONTINUE & PAY"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

