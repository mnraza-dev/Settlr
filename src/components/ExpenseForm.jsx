import { useState, useEffect } from "react";

export default function ExpenseForm({ members, onAddExpense }) {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState("");
  const [participants, setParticipants] = useState([]);
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
    <div className="rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
      bg-zinc-950 border border-zinc-800 space-y-6 transition-all">
      <h2 className="text-2xl font-semibold text-white tracking-tight">
        Add Expense
      </h2>

      <select
        className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-white/20
          transition"
        value={paidBy}
        onChange={(e) => setPaidBy(e.target.value)}
      >
        {members.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount"
        className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-white/20
          transition"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Participants */}
      <div className="flex flex-wrap gap-3">
        {members.map((m) => (
          <label
            key={m}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer
              border border-zinc-800 transition
              ${participants.includes(m) ? "bg-yellow-600 text-white" : "bg-red-900 text-zinc-300"}
              hover:bg-yellow-800 hover:text-white`}
          >
            <input
              type="checkbox"
              checked={participants.includes(m)}
              onChange={() => toggleParticipant(m)}
              className="hidden"
            />
            {m}
          </label>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
        bg-slate-800 text-white
        dark:bg-white dark:text-slate-900 cursor-pointer"
      >
        Add Expense
      </button>
    </div>
  );
}