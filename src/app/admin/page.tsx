"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface PropBet {
  id: number;
  topic: string;
  choiceA: string;
  choiceB: string;
  order: number;
}

interface ScoreEntry {
  id: number;
  playerName: string;
  score: number;
  total: number;
}

interface Entry {
  id: number;
  playerName: string;
  createdAt: string;
}

export default function AdminPage() {
  const [props, setProps] = useState<PropBet[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [existingAnswers, setExistingAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [editChoiceA, setEditChoiceA] = useState("");
  const [editChoiceB, setEditChoiceB] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/props")
      .then((res) => res.json())
      .then((data) => setProps(data));

    fetch("/api/answer-key")
      .then((res) => res.json())
      .then((data) => {
        const map: Record<number, string> = {};
        for (const a of data) {
          map[a.propBetId] = a.correctChoice;
        }
        setAnswers(map);
        setExistingAnswers(map);
      });

    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));

    fetch("/api/scoreboard")
      .then((res) => res.json())
      .then((data) => setScores(data.scores || []));
  }, []);

  const handleSaveAnswers = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const unanswered = props.filter((p) => !answers[p.id]);
    if (unanswered.length > 0) {
      setMessage(`Please set all 25 answers. ${unanswered.length} remaining.`);
      return;
    }

    setSaving(true);

    const answerList = props.map((p) => ({
      propBetId: p.id,
      correctChoice: answers[p.id],
    }));

    const res = await fetch("/api/answer-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: answerList }),
    });

    if (res.ok) {
      setMessage("Answer key saved!");
      setExistingAnswers({ ...answers });
      // Refresh scoreboard
      const scoreRes = await fetch("/api/scoreboard");
      const scoreData = await scoreRes.json();
      setScores(scoreData.scores || []);
    } else {
      setMessage("Failed to save answer key.");
    }
    setSaving(false);
  };

  const startEditing = (prop: PropBet) => {
    setEditingId(prop.id);
    setEditTopic(prop.topic);
    setEditChoiceA(prop.choiceA);
    setEditChoiceB(prop.choiceB);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  const saveEdit = async (id: number) => {
    setEditSaving(true);
    const res = await fetch("/api/props", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        topic: editTopic,
        choiceA: editChoiceA,
        choiceB: editChoiceB,
      }),
    });

    if (res.ok) {
      const updated = await res.json();
      setProps((prev) =>
        prev.map((p) => (p.id === id ? updated : p))
      );
      setEditingId(null);
    }
    setEditSaving(false);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadMessage("");
    setUploading(true);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!Array.isArray(data)) {
        setUploadMessage("JSON must be an array of objects.");
        setUploading(false);
        return;
      }

      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!item.topic || !item.choiceA || !item.choiceB) {
          setUploadMessage(
            `Item ${i + 1} is missing required fields (topic, choiceA, choiceB).`
          );
          setUploading(false);
          return;
        }
      }

      const res = await fetch("/api/props", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ props: data }),
      });

      if (res.ok) {
        const newProps = await res.json();
        setProps(newProps);
        setAnswers({});
        setExistingAnswers({});
        setUploadMessage(`Replaced with ${newProps.length} questions.`);
      } else {
        const err = await res.json();
        setUploadMessage(err.error || "Upload failed.");
      }
    } catch {
      setUploadMessage("Invalid JSON file.");
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <Link href="/" className="text-yellow-400 hover:underline mb-6 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-4xl font-bold text-yellow-400 mb-8">Admin Panel</h1>

      {/* Edit Questions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Edit Questions</h2>

        <div className="bg-gray-800 rounded-lg p-5 border border-gray-700 mb-6">
          <h3 className="font-semibold mb-2">Upload JSON</h3>
          <p className="text-sm text-gray-400 mb-3">
            Upload a JSON file with an array of objects, each with{" "}
            <code className="bg-gray-700 px-1 rounded">topic</code>,{" "}
            <code className="bg-gray-700 px-1 rounded">choiceA</code>, and{" "}
            <code className="bg-gray-700 px-1 rounded">choiceB</code>.
            This will replace all existing questions.
          </p>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm">
              {uploading ? "Uploading..." : "Choose File"}
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
          {uploadMessage && (
            <p
              className={`mt-3 text-sm font-semibold ${
                uploadMessage.includes("Replaced")
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {uploadMessage}
            </p>
          )}
        </div>

        <div className="space-y-4">
          {props.map((prop) => (
            <div
              key={prop.id}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              {editingId === prop.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Question</label>
                    <input
                      type="text"
                      value={editTopic}
                      onChange={(e) => setEditTopic(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-400 mb-1">Choice A</label>
                      <input
                        type="text"
                        value={editChoiceA}
                        onChange={(e) => setEditChoiceA(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-400 mb-1">Choice B</label>
                      <input
                        type="text"
                        value={editChoiceB}
                        onChange={(e) => setEditChoiceB(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-gray-700 border border-gray-600 text-white focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(prop.id)}
                      disabled={editSaving}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                      {editSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-semibold">
                      <span className="text-yellow-400">#{prop.order}.</span>{" "}
                      {prop.topic}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      A: {prop.choiceA} &nbsp;|&nbsp; B: {prop.choiceB}
                    </p>
                  </div>
                  <button
                    onClick={() => startEditing(prop)}
                    className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Answer Key Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Answer Key</h2>
        <form onSubmit={handleSaveAnswers}>
          <div className="space-y-4">
            {props.map((prop) => (
              <div
                key={prop.id}
                className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <p className="font-semibold flex-1">
                  <span className="text-yellow-400">#{prop.order}.</span>{" "}
                  {prop.topic}
                </p>
                <div className="flex gap-3">
                  <label
                    className={`cursor-pointer rounded-lg px-4 py-2 text-center border-2 transition-colors ${
                      answers[prop.id] === "A"
                        ? "border-green-500 bg-green-900/40"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`answer-${prop.id}`}
                      value="A"
                      checked={answers[prop.id] === "A"}
                      onChange={() =>
                        setAnswers((a) => ({ ...a, [prop.id]: "A" }))
                      }
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{prop.choiceA}</span>
                  </label>
                  <label
                    className={`cursor-pointer rounded-lg px-4 py-2 text-center border-2 transition-colors ${
                      answers[prop.id] === "B"
                        ? "border-green-500 bg-green-900/40"
                        : "border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`answer-${prop.id}`}
                      value="B"
                      checked={answers[prop.id] === "B"}
                      onChange={() =>
                        setAnswers((a) => ({ ...a, [prop.id]: "B" }))
                      }
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{prop.choiceB}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          {message && (
            <p
              className={`mt-4 text-lg font-semibold ${
                message.includes("saved") ? "text-green-400" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
          >
            {saving ? "Saving..." : "Save Answer Key"}
          </button>
        </form>
      </section>

      {/* Entries Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">
          Entries ({entries.length})
        </h2>
        {entries.length === 0 ? (
          <p className="text-gray-400">No entries yet.</p>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700 divide-y divide-gray-700">
            {entries.map((entry) => (
              <div key={entry.id} className="p-4 flex justify-between">
                <span className="font-medium">{entry.playerName}</span>
                <span className="text-gray-400 text-sm">
                  {new Date(entry.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Scoreboard Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Scoreboard</h2>
        {Object.keys(existingAnswers).length === 0 ? (
          <p className="text-gray-400">
            Submit the answer key to see scores.
          </p>
        ) : scores.length === 0 ? (
          <p className="text-gray-400">No entries to score yet.</p>
        ) : (
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="grid grid-cols-3 gap-4 p-4 border-b border-gray-600 font-bold text-yellow-400">
              <span>Rank</span>
              <span>Player</span>
              <span className="text-right">Score</span>
            </div>
            {scores.map((entry, idx) => (
              <div
                key={entry.id}
                className={`grid grid-cols-3 gap-4 p-4 ${
                  idx < scores.length - 1 ? "border-b border-gray-700" : ""
                } ${idx === 0 ? "bg-yellow-900/20" : ""}`}
              >
                <span className="font-bold">
                  {idx === 0 ? "1st" : idx === 1 ? "2nd" : idx === 2 ? "3rd" : `${idx + 1}th`}
                </span>
                <span>{entry.playerName}</span>
                <span className="text-right font-mono text-lg">
                  {entry.score}/{entry.total}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
