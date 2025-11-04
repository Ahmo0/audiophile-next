import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6">audiophile</h2>
            <p className="text-gray-400 max-w-md">
              Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio.
            </p>
            <p className="text-gray-400 mt-6">
              Copyright 2024. All Rights Reserved
            </p>
          </div>
          
          <nav className="flex flex-col md:flex-row gap-6">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              HOME
            </Link>
            <Link href="/headphones" className="hover:text-orange-500 transition-colors">
              HEADPHONES
            </Link>
            <Link href="/speakers" className="hover:text-orange-500 transition-colors">
              SPEAKERS
            </Link>
            <Link href="/earphones" className="hover:text-orange-500 transition-colors">
              EARPHONES
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

