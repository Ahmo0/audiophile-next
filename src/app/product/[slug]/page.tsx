import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params; // ✅ Await params
  const product = getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img
        src={product.mainImage}
        alt={product.name}
        className="my-5 rounded-lg"
      />
      <p className="text-gray-700">{product.description}</p>
      <p className="mt-4 font-semibold">${product.price}</p>
    </div>
  );
}
