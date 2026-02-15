import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-4">
      <header className="mb-8 flex flex-col justify-center items-center gap-2">
        <Link href="/" className="flex">
          <Image
            aria-hidden
            src="/logo.png"
            alt="Carus Logo"
            width={235}
            height={64}
            className="w-[117px] h-[32px]"
          />
        </Link>
        <h1 className="text-4xl font-extrabold text-primary">
          Carus Recycling
        </h1>
      </header>

      <main className="text-center max-w-xl w-full">
        <Clock className="w-16 h-16 text-primary mx-auto mb-6" />

        <h2 className="text-5xl font-bold mb-4">Almost There!</h2>

        <p className="text-xl text-gray-600 mb-8">
          The application features are currently under construction. Please
          check back soon!
        </p>

        <Link
          href="/"
          className="inline-block px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition"
        >
          Go back to the Landing Page
        </Link>
      </main>
    </div>
  );
}
