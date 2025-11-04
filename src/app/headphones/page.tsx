import { products } from "@/lib/products";
import Link from "next/link";

export default function HeadphonesPage() {
  const categoryProducts = products.filter((p) => p.category === "headphones");

  return (
    <div className="container mx-auto px-6 my-16">
      <h1 className="text-3xl font-bold mb-10">Headphones</h1>
      <div className="grid md:grid-cols-2 gap-12">
        {categoryProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg p-6">
            <img
              src={product.mainImage}
              alt={product.name}
              className="rounded-lg mb-6 w-full"
            />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <Link
              href={`/product/${product.slug}`}
              className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
            >
              See Product
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
