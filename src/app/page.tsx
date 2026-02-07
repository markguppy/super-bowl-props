import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <Image
          src="/nfl-shield.svg"
          alt="NFL Shield"
          width={80}
          height={107}
          className="mx-auto mb-6"
        />
        <h1 className="text-5xl font-bold mb-2">
          Super Bowl <span className="text-nfl-red">LX</span>
        </h1>
        <p className="text-lg text-surface-500 mb-8">Prop Bets Challenge</p>

        {/* Team Matchup */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10">
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-seahawks-green bg-surface-800 flex items-center justify-center overflow-hidden">
              <Image
                src="/seahawks-logo.svg"
                alt="Seahawks"
                width={120}
                height={120}
              />
            </div>
            <span className="mt-3 font-bold text-seahawks-green text-sm tracking-wider">SEAHAWKS</span>
          </div>

          <span className="text-3xl sm:text-4xl font-black text-surface-500">VS</span>

          <div className="flex flex-col items-center">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-patriots-red bg-surface-800 flex items-center justify-center overflow-hidden">
              <Image
                src="/patriots-logo.svg"
                alt="Patriots"
                width={120}
                height={120}
              />
            </div>
            <span className="mt-3 font-bold text-patriots-red text-sm tracking-wider">PATRIOTS</span>
          </div>
        </div>

        <p className="text-lg text-gray-300 mb-10">
          Make your picks for 25 Super Bowl prop bets and see how you stack up
          against the competition!
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link
            href="/picks"
            className="bg-nfl-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Submit Your Picks
          </Link>
          <Link
            href="/admin"
            className="bg-surface-700 hover:bg-surface-600 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Admin / Scoreboard
          </Link>
        </div>
      </div>
    </main>
  );
}
