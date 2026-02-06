import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold mb-4 text-yellow-400">
          Super Bowl Prop Bets
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Make your picks for 25 Super Bowl prop bets and see how you stack up
          against the competition!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            href="/picks"
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Submit Your Picks
          </Link>
          <Link
            href="/admin"
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-colors"
          >
            Admin / Scoreboard
          </Link>
        </div>
      </div>
    </main>
  );
}
