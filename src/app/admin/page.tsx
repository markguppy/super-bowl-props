"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  tiebreaker: number;
  tiebreakerDiff: number | null;
}

interface Entry {
  id: number;
  playerName: string;
  venmoUsername: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [props, setProps] = useState<PropBet[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [existingAnswers, setExistingAnswers] = useState<Record<number, string>>({});
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [tiebreakerAnswer, setTiebreakerAnswer] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [editChoiceA, setEditChoiceA] = useState("");
  const [editChoiceB, setEditChoiceB] = useState("");
  const [editSaving, setEditSaving] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [submissionsClosed, setSubmissionsClosed] = useState(false);
  const [togglingSubmissions, setTogglingSubmissions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  useEffect(() => {
    fetch("/api/props")
      .then((res) => res.json())
      .then((data) => setProps(data));

    fetch("/api/answer-key")
      .then((res) => res.json())
      .then((data) => {
        const answerList = data.answers || data;
        const map: Record<number, string> = {};
        for (const a of answerList) {
          map[a.propBetId] = a.correctChoice;
        }
        setAnswers(map);
        setExistingAnswers(map);
        if (data.tiebreakerAnswer != null) {
          setTiebreakerAnswer(String(data.tiebreakerAnswer));
        }
      });

    fetch("/api/entries")
      .then((res) => res.json())
      .then((data) => setEntries(data));

    fetch("/api/scoreboard")
      .then((res) => res.json())
      .then((data) => setScores(data.scores || []));

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => setSubmissionsClosed(data.submissionsClosed));
  }, []);

  const handleSaveAnswers = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const unanswered = props.filter((p) => !answers[p.id]);
    if (unanswered.length > 0) {
      setMessage(`Please set all ${props.length} answers. ${unanswered.length} remaining.`);
      return;
    }

    setSaving(true);

    const answerList = props.map((p) => ({
      propBetId: p.id,
      correctChoice: answers[p.id],
    }));

    const tiebreakerNum = tiebreakerAnswer.trim()
      ? parseInt(tiebreakerAnswer, 10)
      : undefined;

    const res = await fetch("/api/answer-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: answerList, tiebreakerAnswer: tiebreakerNum }),
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

  const handleToggleSubmissions = async () => {
    setTogglingSubmissions(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ submissionsClosed: !submissionsClosed }),
    });
    if (res.ok) {
      const data = await res.json();
      setSubmissionsClosed(data.submissionsClosed);
    }
    setTogglingSubmissions(false);
  };

  const handleDeleteEntry = async (id: number, playerName: string) => {
    if (!confirm(`Delete entry from ${playerName}? This cannot be undone.`)) return;

    setDeletingId(id);
    const res = await fetch("/api/entries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
      setScores((prev) => prev.filter((s) => s.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/" className="text-nfl-red hover:underline mb-2 inline-block">
            &larr; Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-nfl-red">Admin Panel</h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-surface-700 hover:bg-surface-600 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm"
        >
          Log Out
        </button>
      </div>

      {/* Submissions Toggle */}
      <section className="mb-8">
        <div className="bg-surface-800 rounded-lg p-5 border border-surface-600 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">Pick Submissions</h2>
            <p className={`text-sm font-semibold mt-1 ${submissionsClosed ? "text-red-400" : "text-seahawks-green"}`}>
              {submissionsClosed ? "Closed — no new picks allowed" : "Open — accepting picks"}
            </p>
          </div>
          <button
            onClick={handleToggleSubmissions}
            disabled={togglingSubmissions}
            className={`font-bold py-2 px-6 rounded-lg transition-colors text-sm ${
              submissionsClosed
                ? "bg-seahawks-green hover:bg-green-600 text-white"
                : "bg-nfl-red hover:bg-red-700 text-white"
            } disabled:bg-surface-600`}
          >
            {togglingSubmissions
              ? "Updating..."
              : submissionsClosed
              ? "Open Submissions"
              : "Close Submissions"}
          </button>
        </div>
      </section>

      {/* Edit Questions Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Edit Questions</h2>

        <div className="bg-surface-800 rounded-lg p-5 border border-surface-600 mb-6">
          <h3 className="font-semibold mb-2">Upload JSON</h3>
          <p className="text-sm text-gray-400 mb-3">
            Upload a JSON file with an array of objects, each with{" "}
            <code className="bg-surface-700 px-1 rounded">topic</code>,{" "}
            <code className="bg-surface-700 px-1 rounded">choiceA</code>, and{" "}
            <code className="bg-surface-700 px-1 rounded">choiceB</code>.
            This will replace all existing questions.
          </p>
          <div className="flex items-center gap-4">
            <label className="cursor-pointer bg-nfl-navy hover:bg-blue-900 text-white font-bold py-2 px-5 rounded-lg transition-colors text-sm">
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
                  ? "text-seahawks-green"
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
              className="bg-surface-800 rounded-lg p-4 border border-surface-600"
            >
              {editingId === prop.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Question</label>
                    <input
                      type="text"
                      value={editTopic}
                      onChange={(e) => setEditTopic(e.target.value)}
                      className="w-full px-3 py-2 rounded bg-surface-700 border border-surface-600 text-white focus:outline-none focus:border-nfl-red"
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-sm text-gray-400 mb-1">Choice A</label>
                      <input
                        type="text"
                        value={editChoiceA}
                        onChange={(e) => setEditChoiceA(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-surface-700 border border-surface-600 text-white focus:outline-none focus:border-nfl-red"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm text-gray-400 mb-1">Choice B</label>
                      <input
                        type="text"
                        value={editChoiceB}
                        onChange={(e) => setEditChoiceB(e.target.value)}
                        className="w-full px-3 py-2 rounded bg-surface-700 border border-surface-600 text-white focus:outline-none focus:border-nfl-red"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => saveEdit(prop.id)}
                      disabled={editSaving}
                      className="bg-seahawks-green hover:bg-green-600 disabled:bg-surface-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                      {editSaving ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-surface-600 hover:bg-surface-500 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="font-semibold">
                      <span className="text-nfl-red">#{prop.order}.</span>{" "}
                      {prop.topic}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      A: {prop.choiceA} &nbsp;|&nbsp; B: {prop.choiceB}
                    </p>
                  </div>
                  <button
                    onClick={() => startEditing(prop)}
                    className="bg-surface-700 hover:bg-surface-600 text-white py-2 px-4 rounded transition-colors text-sm"
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
                className="bg-surface-800 rounded-lg p-4 border border-surface-600 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <p className="font-semibold flex-1">
                  <span className="text-nfl-red">#{prop.order}.</span>{" "}
                  {prop.topic}
                </p>
                <div className="flex gap-3">
                  <label
                    className={`cursor-pointer rounded-lg px-4 py-2 text-center border-2 transition-colors ${
                      answers[prop.id] === "A"
                        ? "border-seahawks-green bg-seahawks-green/20"
                        : "border-surface-600 hover:border-gray-400"
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
                        ? "border-seahawks-green bg-seahawks-green/20"
                        : "border-surface-600 hover:border-gray-400"
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

          {/* Tiebreaker Answer */}
          <div className="mt-6 bg-surface-800 rounded-lg p-4 border border-surface-600">
            <label className="block font-semibold mb-2">
              Tiebreaker: Total Points Scored by Both Teams
            </label>
            <input
              type="number"
              min="0"
              value={tiebreakerAnswer}
              onChange={(e) => setTiebreakerAnswer(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-surface-700 border border-surface-600 text-white text-lg focus:outline-none focus:border-nfl-red"
              placeholder="e.g. 47"
            />
          </div>

          {message && (
            <p
              className={`mt-4 text-lg font-semibold ${
                message.includes("saved") ? "text-seahawks-green" : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 bg-nfl-red hover:bg-red-700 disabled:bg-surface-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors"
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
          <div className="bg-surface-800 rounded-lg border border-surface-600 divide-y divide-surface-600">
            {entries.map((entry) => (
              <div key={entry.id} className="p-4 flex items-center justify-between gap-3">
                <span className="font-medium">
                  {entry.playerName} <span className="text-gray-400 text-sm">({entry.venmoUsername})</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-sm">
                    {new Date(entry.createdAt).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleDeleteEntry(entry.id, entry.playerName)}
                    disabled={deletingId === entry.id}
                    className="text-red-400 hover:text-red-300 disabled:text-surface-500 text-sm font-semibold transition-colors"
                  >
                    {deletingId === entry.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
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
                <span className="font-bold">
                  {idx === 0 ? "1st" : idx === 1 ? "2nd" : idx === 2 ? "3rd" : `${idx + 1}th`}
                </span>
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
      </section>
    </main>
  );
}
