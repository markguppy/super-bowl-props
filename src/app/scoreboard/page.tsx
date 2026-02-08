"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ScoreEntry {
  id: number;
  playerName: string;
  score: number;
  total: number;
  tiebreaker: number;
  tiebreakerDiff: number | null;
}

function rankLabel(idx: number): string {
  if (idx === 0) return "1st";
  if (idx === 1) return "2nd";
  if (idx === 2) return "3rd";
  return `${idx + 1}th`;
}

export default function ScoreboardPage() {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAnswerKey, setHasAnswerKey] = useState(false);

  useEffect(() => {
    fetch("/api/scoreboard")
      .then((res) => res.json())
      .then((data) => {
        const list = data.scores || [];
        setScores(list);
        setHasAnswerKey(list.length > 0 || !data.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-nfl-red hover:underline mb-2 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold text-nfl-red mb-8">Scoreboard</h1>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : !hasAnswerKey ? (
        <div className="bg-surface-800 rounded-lg p-8 border border-surface-600 text-center">
          <p className="text-lg text-gray-400">
            Scoreboard not available yet. Check back after the game!
          </p>
        </div>
      ) : scores.length === 0 ? (
        <div className="bg-surface-800 rounded-lg p-8 border border-surface-600 text-center">
          <p className="text-lg text-gray-400">
            No entries to score yet.
          </p>
        </div>
      ) : (
        <div className="bg-surface-800 rounded-lg border border-surface-600 overflow-x-auto">
          <div className="grid grid-cols-5 gap-4 p-4 border-b border-surface-600 font-bold text-nfl-red min-w-[500px]">
            <span>Rank</span>
            <span>Player</span>
            <span className="text-right">Score</span>
            <span className="text-right">Tiebreaker</span>
            <span className="text-right">Diff</span>
          </div>
          {scores.map((entry, idx) => (
            <div
              key={entry.id}
              className={`grid grid-cols-5 gap-4 p-4 min-w-[500px] ${
                idx < scores.length - 1 ? "border-b border-surface-600" : ""
              } ${idx === 0 ? "bg-nfl-red/10" : ""}`}
            >
              <span className="font-bold">{rankLabel(idx)}</span>
              <span>{entry.playerName}</span>
              <span className="text-right font-mono text-lg">
                {entry.score}/{entry.total}
              </span>
              <span className="text-right font-mono">
                {entry.tiebreaker}
              </span>
              <span className="text-right font-mono text-gray-400">
                {entry.tiebreakerDiff != null ? `±${entry.tiebreakerDiff}` : "—"}
              </span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
