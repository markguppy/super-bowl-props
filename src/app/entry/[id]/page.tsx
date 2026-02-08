"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Pick {
  id: number;
  selection: string;
  propBet: {
    id: number;
    topic: string;
    choiceA: string;
    choiceB: string;
    order: number;
  };
}

interface Entry {
  id: number;
  playerName: string;
  tiebreaker: number;
  picks: Pick[];
}

export default function EntryPage() {
  const params = useParams();
  const [entry, setEntry] = useState<Entry | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/entries/${params.id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => {
        setEntry(data.entry);
        setAnswers(data.answers);
      })
      .catch(() => setError("Entry not found"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="min-h-screen p-8 max-w-4xl mx-auto">
        <Link href="/scoreboard" className="text-nfl-red hover:underline mb-2 inline-block">
          &larr; Back to Scoreboard
        </Link>
        <p className="text-red-400 text-lg mt-4">{error || "Entry not found"}</p>
      </main>
    );
  }

  const gradedCount = Object.keys(answers).length;
  const correctCount = entry.picks.reduce((count, pick) => {
    const answer = answers[pick.propBet.id];
    return count + (answer && pick.selection === answer ? 1 : 0);
  }, 0);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/scoreboard" className="text-nfl-red hover:underline mb-2 inline-block">
        &larr; Back to Scoreboard
      </Link>
      <h1 className="text-4xl font-bold text-nfl-red mb-2">{entry.playerName}</h1>
      {gradedCount > 0 && (
        <p className="text-lg text-gray-300 mb-6">
          Score: <span className="font-mono font-bold text-white">{correctCount}/{gradedCount}</span>
        </p>
      )}

      <div className="space-y-3">
        {entry.picks.map((pick) => {
          const answer = answers[pick.propBet.id];
          const isGraded = !!answer;
          const isCorrect = isGraded && pick.selection === answer;
          const isIncorrect = isGraded && pick.selection !== answer;

          return (
            <div
              key={pick.id}
              className={`rounded-lg p-4 border-2 ${
                isCorrect
                  ? "border-seahawks-green bg-seahawks-green/10"
                  : isIncorrect
                  ? "border-red-400 bg-red-400/10"
                  : "border-surface-600 bg-surface-800"
              }`}
            >
              <p className="font-semibold mb-2">
                <span className="text-nfl-red">#{pick.propBet.order}.</span>{" "}
                {pick.propBet.topic}
              </p>
              <div className="flex gap-3">
                <span
                  className={`rounded-lg px-4 py-2 text-sm font-medium border-2 ${
                    pick.selection === "A"
                      ? isCorrect
                        ? "border-seahawks-green bg-seahawks-green/20 text-white"
                        : isIncorrect
                        ? "border-red-400 bg-red-400/20 text-white"
                        : "border-seahawks-green/20 bg-seahawks-green/10 text-white"
                      : "border-surface-600 text-gray-500"
                  }`}
                >
                  {pick.propBet.choiceA}
                </span>
                <span
                  className={`rounded-lg px-4 py-2 text-sm font-medium border-2 ${
                    pick.selection === "B"
                      ? isCorrect
                        ? "border-seahawks-green bg-seahawks-green/20 text-white"
                        : isIncorrect
                        ? "border-red-400 bg-red-400/20 text-white"
                        : "border-seahawks-green/20 bg-seahawks-green/10 text-white"
                      : "border-surface-600 text-gray-500"
                  }`}
                >
                  {pick.propBet.choiceB}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-surface-800 rounded-lg p-4 border border-surface-600">
        <p className="text-gray-400 text-sm">Tiebreaker guess</p>
        <p className="text-lg font-mono font-bold">{entry.tiebreaker}</p>
      </div>
    </main>
  );
}
