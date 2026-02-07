"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface PropBet {
  id: number;
  topic: string;
  choiceA: string;
  choiceB: string;
  order: number;
}

export default function PicksPage() {
  const [props, setProps] = useState<PropBet[]>([]);
  const [playerName, setPlayerName] = useState("");
  const [venmoUsername, setVenmoUsername] = useState("");
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/props")
      .then((res) => res.json())
      .then((data) => setProps(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!playerName.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!venmoUsername.trim()) {
      setError("Please enter your Venmo username.");
      return;
    }

    const unanswered = props.filter((p) => !selections[p.id]);
    if (unanswered.length > 0) {
      setError(
        `Please answer all 25 questions. You have ${unanswered.length} remaining.`
      );
      return;
    }

    setSubmitting(true);

    const picks = props.map((p) => ({
      propBetId: p.id,
      selection: selections[p.id],
    }));

    const res = await fetch("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerName: playerName.trim(), venmoUsername: venmoUsername.trim(), picks }),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      const data = await res.json();
      setError(data.error || "Failed to submit picks.");
    }
    setSubmitting(false);
  };

  if (submitted) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            Picks Submitted!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Thanks, {playerName}! Your picks have been recorded.
          </p>
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <Link href="/" className="text-yellow-400 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Submit Your Picks
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label className="block text-lg font-semibold mb-2">Your Name</label>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white text-lg focus:outline-none focus:border-yellow-400"
            placeholder="Enter your name"
          />
        </div>

        <div className="space-y-6">
          {props.map((prop) => (
            <div
              key={prop.id}
              className="bg-gray-800 rounded-lg p-5 border border-gray-700"
            >
              <p className="font-semibold text-lg mb-3">
                <span className="text-yellow-400">#{prop.order}.</span>{" "}
                {prop.topic}
              </p>
              <div className="flex gap-4">
                <label
                  className={`flex-1 cursor-pointer rounded-lg p-3 text-center border-2 transition-colors ${
                    selections[prop.id] === "A"
                      ? "border-green-500 bg-green-900/40"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name={`prop-${prop.id}`}
                    value="A"
                    checked={selections[prop.id] === "A"}
                    onChange={() =>
                      setSelections((s) => ({ ...s, [prop.id]: "A" }))
                    }
                    className="sr-only"
                  />
                  <span className="font-medium">{prop.choiceA}</span>
                </label>
                <label
                  className={`flex-1 cursor-pointer rounded-lg p-3 text-center border-2 transition-colors ${
                    selections[prop.id] === "B"
                      ? "border-green-500 bg-green-900/40"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name={`prop-${prop.id}`}
                    value="B"
                    checked={selections[prop.id] === "B"}
                    onChange={() =>
                      setSelections((s) => ({ ...s, [prop.id]: "B" }))
                    }
                    className="sr-only"
                  />
                  <span className="font-medium">{prop.choiceB}</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        {/* Venmo Payment */}
        <div className="mt-10 bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <h2 className="text-xl font-bold mb-2">Entry Fee: $20</h2>
          <p className="text-gray-400 mb-4">
            Send payment via Venmo to <span className="text-white font-semibold">@Mark-Guppy</span> to complete your entry.
          </p>
          <img
            src="/venmo.png"
            alt="Venmo QR code for @Mark-Guppy"
            className="mx-auto w-48 h-48 rounded-lg"
          />
          <div className="mt-6 max-w-sm mx-auto">
            <label className="block text-sm font-semibold mb-1 text-left">
              Your Venmo Username
            </label>
            <p className="text-gray-400 text-sm mb-2 text-left">
              Used to match your payment to this entry.
            </p>
            <input
              type="text"
              value={venmoUsername}
              onChange={(e) => setVenmoUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white text-lg focus:outline-none focus:border-yellow-400"
              placeholder="@your-venmo"
            />
          </div>
          <p className="mt-4 text-red-400 text-sm font-semibold">
            Entries without payment will be deleted at the national anthem.
          </p>
        </div>

        {error && (
          <p className="text-red-400 mt-6 text-lg font-semibold">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-8 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-4 rounded-lg text-xl transition-colors"
        >
          {submitting ? "Submitting..." : "Submit Picks"}
        </button>
      </form>
    </main>
  );
}
