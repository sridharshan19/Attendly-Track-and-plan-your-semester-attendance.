import AnimatedBackground from '../components/AnimatedBackground';
import AttendanceCalculator from '../components/AttendanceCalculator';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col selection:bg-cyan-500 selection:text-black">
      <AnimatedBackground />
      <Header />
      <main className="flex-1 pt-20 pb-8">
        <div className="text-center max-w-4xl mx-auto px-4 pt-4 pb-2">
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 inline-block mb-3">
            Attendance Planner
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Know your attendance.{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
              Plan your classes.
            </span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Calculate your current percentage, safe skips, and required classes instantly.
          </p>
        </div>

        <AttendanceCalculator />
      </main>
      <Footer />
    </div>
  );
}
