import { Product } from "@/types";

// Sample product data - Replace with your actual Audiophile products
export const products: Product[] = [
  {
    id: "xx99-mark-two-headphones",
    name: "XX99 Mark II Headphones",
    slug: "xx99-mark-two-headphones",
    category: "headphones",
    categoryImage: "/assets/product-xx99-mark-two-headphones/category.jpg",
    new: true,
    price: 2999,
    description:
      "The new XX99 Mark II headphones is the pinnacle of pristine audio. It redefines your premium headphone experience by reproducing the balanced depth and precision of studio-quality sound.",
    features:
      "Featuring a genuine leather head strap and premium earcups, these headphones deliver superior comfort for those who like to enjoy endless listening. It includes intuitive controls designed for any situation. Whether you're taking a business call or just in your own personal space, the auto on/off and pause features ensure that you'll never miss a beat.",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
      { quantity: 1, item: "Travel bag" },
    ],
    gallery: {
      first: "/assets/product-xx99-mark-two-headphones/gallery-1.jpg",
      second: "/assets/product-xx99-mark-two-headphones/gallery-2.jpg",
      third: "/assets/product-xx99-mark-two-headphones/gallery-3.jpg",
    },
    mainImage: "/assets/product-xx99-mark-two-headphones/desktop.jpg",
  },
  {
    id: "xx99-mark-one-headphones",
    name: "XX99 Mark I Headphones",
    slug: "xx99-mark-one-headphones",
    category: "headphones",
    categoryImage: "/assets/product-xx99-mark-one-headphones/category.jpg",
    new: false,
    price: 1750,
    description:
      "As the gold standard for headphones, the classic XX99 Mark I offers detailed and accurate audio reproduction for audiophiles, mixing engineers, and music aficionados alike in studios and on the go.",
    features:
      "As the headphones all others are measured against, the XX99 Mark I demonstrates over five decades of audio expertise, redefining the critical listening experience. This pair of closed-back headphones are made of industrial, aerospace-grade materials to emphasize durability at a relatively light weight of 11 oz.",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
    ],
    gallery: {
      first: "/assets/product-xx99-mark-one-headphones/gallery-1.jpg",
      second: "/assets/product-xx99-mark-one-headphones/gallery-2.jpg",
      third: "/assets/product-xx99-mark-one-headphones/gallery-3.jpg",
    },
    mainImage: "/assets/product-xx99-mark-one-headphones/desktop.jpg",
  },
  {
    id: "xx59-headphones",
    name: "XX59 Headphones",
    slug: "xx59-headphones",
    category: "headphones",
    categoryImage: "/assets/product-xx59-headphones/category.jpg",
    new: false,
    price: 899,
    description:
      "Enjoy your audio almost anywhere and customize your listening experience with the XX59 headphones. The stylish yet durable versatile wireless headset is a brilliant companion at home or on the move.",
    features:
      "These headphones have been created from durable, high-quality materials tough enough to take anywhere. Its compact folding design fuses comfort and minimalist style making it perfect for travel. Flawless transmission is assured by the latest wireless technology engineered for audio synchronization with videos.",
    includes: [
      { quantity: 1, item: "Headphone unit" },
      { quantity: 2, item: "Replacement earcups" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 5m audio cable" },
    ],
    gallery: {
      first: "/assets/product-xx59-headphones/gallery-1.jpg",
      second: "/assets/product-xx59-headphones/gallery-2.jpg",
      third: "/assets/product-xx59-headphones/gallery-3.jpg",
    },
    mainImage: "/assets/product-xx59-headphones/desktop.jpg",
  },
  {
    id: "zx9-speaker",
    name: "ZX9 Speaker",
    slug: "zx9-speaker",
    category: "speakers",
    categoryImage: "/assets/product-zx9-speaker/category.jpg",
    new: true,
    price: 4500,
    description:
      "Upgrade your sound system with the all new ZX9 active speaker. It's a bookshelf speaker system that offers truly wireless capability -- providing new possibilities for more pleasing and practical audio setups.",
    features:
      "Connect via Bluetooth or nearly any wired source. This speaker features optical, digital coaxial, USB Type-B, stereo RCA, and 3.5mm inputs, allowing you to have up to five wired source devices connected for easy switching. Improved bluetooth technology offers near lossless audio quality at up to 328ft (100m).",
    includes: [
      { quantity: 2, item: "Speaker unit" },
      { quantity: 2, item: "Speaker cloth panel" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 10m audio cable" },
      { quantity: 1, item: "10m optical cable" },
    ],
    gallery: {
      first: "/assets/product-zx9-speaker/gallery-1.jpg",
      second: "/assets/product-zx9-speaker/gallery-2.jpg",
      third: "/assets/product-zx9-speaker/gallery-3.jpg",
    },
    mainImage: "/assets/product-zx9-speaker/desktop.jpg",
  },
  {
    id: "zx7-speaker",
    name: "ZX7 Speaker",
    slug: "zx7-speaker",
    category: "speakers",
    categoryImage: "/assets/product-zx7-speaker/category.jpg",
    new: false,
    price: 3500,
    description:
      "Stream high quality sound wirelessly with minimal to no loss. The ZX7 speaker uses high-end audiophile components that represents the top of the line powered speakers for home or studio use.",
    features:
      "Reap the advantages of a flat diaphragm tweeter cone. This provides a fast response rate and excellent high frequencies that lower tiered bookshelf speakers cannot provide. The woofers are made from aluminum that produces a unique and clear sound. XLR inputs allow you to connect to a mixer for more advanced usage.",
    includes: [
      { quantity: 2, item: "Speaker unit" },
      { quantity: 2, item: "Speaker cloth panel" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "3.5mm 7.5m audio cable" },
      { quantity: 1, item: "7.5m optical cable" },
    ],
    gallery: {
      first: "/assets/product-zx7-speaker/gallery-1.jpg",
      second: "/assets/product-zx7-speaker/gallery-2.jpg",
      third: "/assets/product-zx7-speaker/gallery-3.jpg",
    },
    mainImage: "/assets/product-zx7-speaker/desktop.jpg",
  },
  {
    id: "yx1-earphones",
    name: "YX1 Wireless Earphones",
    slug: "yx1-earphones",
    category: "earphones",
    categoryImage: "/assets/product-yx1-earphones/category.jpg",
    new: true,
    price: 599,
    description:
      "Tailor your listening experience with bespoke dynamic drivers from the new YX1 Wireless Earphones. Enjoy incredible high-fidelity sound even in noisy environments with its active noise cancellation feature.",
    features:
      "Experience unrivalled stereo sound thanks to innovative acoustic technology. With improved ergonomics designed for full day wearing, these revolutionary earphones have been finely crafted to provide you with the perfect fit, delivering complete comfort all day long while enjoying exceptional noise isolation and truly immersive sound.",
    includes: [
      { quantity: 2, item: "Earphone unit" },
      { quantity: 6, item: "Multi-size earplugs" },
      { quantity: 1, item: "User manual" },
      { quantity: 1, item: "USB-C charging cable" },
      { quantity: 1, item: "Travel pouch" },
    ],
    gallery: {
      first: "/assets/product-yx1-earphones/gallery-1.jpg",
      second: "/assets/product-yx1-earphones/gallery-2.jpg",
      third: "/assets/product-yx1-earphones/gallery-3.jpg",
    },
    mainImage: "/assets/product-yx1-earphones/desktop.jpg",
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

