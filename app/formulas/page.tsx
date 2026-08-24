import AnimatedBackground from '../../components/AnimatedBackground';
import FAQ from '../../components/FAQ';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FormulasPage() {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Background ambient lighting */}
      <AnimatedBackground />

      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Calculator</span>
          </Link>
        </div>

        {/* Calculation Guide Content */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
