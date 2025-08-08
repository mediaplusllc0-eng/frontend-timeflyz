import Image from "@/components/ui/Image";
import Link from "next/link";
import React from "react";

export default function index() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-10 text-center">
      <Image
        src="/img/404.png"
        alt="404 Illustration"
        className="max-w-xl w-full mb-3"
      />
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl mt-4 text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">
        Sorry, we couldn’t find the page you’re looking for.
      </p>
      <Link href="/">
        <p className="inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
          Go back home
        </p>
      </Link>
    </div>
  );
}
