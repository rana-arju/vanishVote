"use client";

import Link from "next/link";
import { PlusCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">
            Vanish <span className="text-green-400">Vote</span>
          </span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="btn btn-primary btn-sm inline-flex items-center"
          >
            <button className="bg-green-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-600 transition cursor-pointer flex justify-center items-center">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Poll
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
