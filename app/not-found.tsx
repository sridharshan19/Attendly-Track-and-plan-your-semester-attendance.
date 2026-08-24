import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-slate-950 text-white">
      <h2 className="text-4xl font-black mb-4">404 - Page Not Found</h2>
      <p className="text-slate-400 mb-6 max-w-md">
        The page you are looking for doesn't exist. Let's get you back to planning your classes!
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-glow"
      >
        Go Home
      </Link>
    </div>
  );
}
