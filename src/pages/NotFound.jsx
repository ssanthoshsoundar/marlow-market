import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <p className="font-[Fraunces] text-5xl mb-3">404</p>
      <p className="text-neutral-500 mb-6">
        This page wandered off somewhere.
      </p>
      <Link
        to="/"
        className="inline-block bg-[#14213D] text-white px-5 py-2.5 rounded-md text-sm hover:bg-[#1e2f52] transition-colors"
      >
        Back to shop
      </Link>
    </div>
  );
}
