import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer details
    customerName: v.string(),
    customerEmail: v.string(),
    customerPhone: v.string(),
    
    // Shipping details
    shippingAddress: v.object({
      street: v.string(),
      city: v.string(),
      state: v.string(),
      zipCode: v.string(),
      country: v.string(),
    }),
    
    // Order items
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.optional(v.string()),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    tax: v.number(),
    total: v.number(),
    
    // Order metadata
    status: v.string(), // "pending", "confirmed", "shipped", "delivered"
    orderId: v.string(), // Unique order ID
    createdAt: v.number(), // Timestamp
  }),
});

