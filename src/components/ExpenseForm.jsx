import { useState, useEffect } from "react";
export default function ExpenseForm({ members, onAddExpense }) {

  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState([]);

  // 🔥 Sync paidBy whenever members change
  useEffect(() => {
    if (members.length > 0) {
      setPaidBy(members[0]);
    } else {
      setPaidBy("");
    }
  }, [members]);

  function toggleParticipant(member) {
    if (participants.includes(member)) {
      setParticipants(participants.filter((p) => p !== member));
    } else {
      setParticipants([...participants, member]);
    }
  }

  function handleSubmit() {
    if (!amount || participants.length === 0 || !paidBy) return;

    onAddExpense({
      paidBy,
      amount: parseFloat(amount),
      participants,
    });

    setAmount("");
    setParticipants([]);
  }

  return (
    <div className="rounded-2xl p-6 mb-8 shadow-lg bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>

      <select
        className="border p-2 rounded w-full mb-3"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      >
        {members.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="border p-2 rounded w-full mb-3"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {members.map((m) => (
        <label key={m} className="block">
          <input
            type="checkbox"
            checked={participants.includes(m)}
            onChange={() => toggleParticipant(m)}
          />
          <span className="ml-2">{m}</span>
        </label>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Expense
      </button>
    </div>
  );
}