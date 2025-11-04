"use client";

import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const { addItem } = useCart();
  const featuredProducts = products.filter((p) => p.new).slice(0, 3);

  const categories = [
    {
      name: "Headphones",
      slug: "/headphones",
      image:
        "/assets/shared/desktop/image-category-thumbnail-headphones.png",
    },
    {
      name: "Speakers",
      slug: "/speakers",
      image:
        "/assets/shared/desktop/image-category-thumbnail-speakers.png",
    },
    {
      name: "Earphones",
      slug: "/earphones",
      image:
        "/assets/shared/desktop/image-category-thumbnail-earphones.png",
    },
  ];

  return (
    <div className="container mx-auto px-6">
      {/* ================= HERO SECTION ================= */}
      <section className="relative bg-black text-white rounded-lg overflow-hidden my-12 flex flex-col md:flex-row items-center justify-between md:px-20 px-8 py-16">
        {/* Left Text Section */}
        <div className="max-w-lg space-y-6 z-10">
          <p className="text-sm text-orange-400 uppercase tracking-[6px]">
            New Product
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            XX99 Mark II
            <br />
            Headphones
          </h1>
          <p className="text-gray-300">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <Link
            href={`/product/${products[0].slug}`}
            className="inline-block bg-orange-500 text-white px-10 py-3 mt-4 rounded hover:bg-orange-600 transition-colors"
          >
            See Product
          </Link>
        </div>

        {/* Right Image (no white background, floating in black) */}
        <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center relative">
          <img
            src="/assets/product-xx99-mark-two-headphones/desktop.jpg"
            alt="XX99 Mark II Headphones"
            className="w-[80%] md:w-[70%] object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.1)] mix-blend-lighten"
          />
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="my-24">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug}
              className="bg-gray-100 rounded-lg text-center hover:bg-gray-200 transition-colors relative h-60 flex flex-col items-center justify-end overflow-hidden"
            >
              {/* Centered Category Image */}
              <div className="absolute top-8 flex justify-center w-full">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-32 md:w-36 object-contain"
                />
              </div>

              {/* Category Text */}
              <div className="mt-auto mb-6 z-10">
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <span className="text-sm text-gray-600 hover:text-orange-500">
                  Shop →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS ================= */}
      <section className="my-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Products
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-lg transition"
            >
              <div className="bg-gray-100 rounded-lg h-64 mb-6 flex items-center justify-center overflow-hidden">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="object-contain w-full h-full"
                />
              </div>

              <h3 className="text-xl font-semibold mb-4">{product.name}</h3>
              <p className="text-gray-600 mb-6">
                {product.description.substring(0, 100)}...
              </p>

              <div className="flex gap-4 justify-center">
                <Link
                  href={`/product/${product.slug}`}
                  className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors"
                >
                  View Details
                </Link>

                <button
                  onClick={() =>
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.mainImage,
                    })
                  }
                  className="border border-orange-500 text-orange-500 px-6 py-2 rounded hover:bg-orange-50 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
