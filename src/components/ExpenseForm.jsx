import { useState, useEffect } from "react";

export default function ExpenseForm({ members, onAddExpense }) {
  const [paidBy, setPaidBy] = useState("");
  const [amount, setAmount] = useState(""); // Main amount (optional if using sub-items)
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState("");
  const [subItems, setSubItems] = useState([{ name: "", price: "" }]);

  useEffect(() => {
    if (members.length > 0) setPaidBy(members[0]);
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, [members]);

  function toggleParticipant(member) {
    setParticipants(prev =>
      prev.includes(member)
        ? prev.filter(m => m !== member)
        : [...prev, member]
    );
  }

  function addSubItem() {
    setSubItems(prev => [...prev, { name: "", price: "" }]);
  }

  function removeSubItem(index) {
    setSubItems(prev => prev.filter((_, i) => i !== index));
  }

  function updateSubItem(index, field, value) {
    const updated = [...subItems];
    updated[index][field] = value;
    setSubItems(updated);
  }

  function handleSubmit() {

    const totalFromSubItems = subItems.reduce((acc, item) => {
      const price = parseFloat(item.price);
      return acc + (isNaN(price) ? 0 : price);
    }, 0);

    const totalAmount = (parseFloat(amount) || 0) + totalFromSubItems;

    if (!paidBy || participants.length === 0 || totalAmount <= 0) {
      alert("Please fill in amount, participants, and payer.");
      return;
    }

    const validSubItems = subItems
      .filter(item => item.name && !isNaN(parseFloat(item.price)))
      .map(item => ({ name: item.name, price: parseFloat(item.price) }));
    onAddExpense({
      paidBy,
      amount: totalAmount,
      participants,
      date,
      details: validSubItems,
    });

    // Reset form
    setAmount("");
    setParticipants([]);
    setSubItems([{ name: "", price: "" }]);
    setDate(new Date().toISOString().split("T")[0]);

    if (!date) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      setDate(`${yyyy}-${mm}-${dd}`);
    }
  }

  return (
    <div className="rounded-2xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
      bg-zinc-950 border border-zinc-800 space-y-6 transition-all">

      <h2 className="text-2xl font-semibold text-white tracking-tight">
        Add Expense
      </h2>

      {/* Paid By */}
      <select
        className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-white/20 transition"
        value={paidBy}
        onChange={e => setPaidBy(e.target.value)}
      >
        {members.map(m => <option key={m} value={m}>{m}</option>)}
      </select>

      {/* Date */}
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-white/20 transition"
      />

      {/* Main Amount */}
      <input
        type="number"
        placeholder="Total Amount (optional if using sub-items)"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full h-12 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500
          focus:outline-none focus:ring-2 focus:ring-white/20 transition"
      />

      {/* Sub-items */}
      <div className="space-y-3">
        {subItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-3 w-full"
          >
            {/* Sub-item Name */}
            <input
              type="text"
              placeholder="Sub-item name"
              value={item.name}
              onChange={(e) => updateSubItem(index, "name", e.target.value)}
              className="flex-1 py-3 mb-2 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition w-full"
            />

            {/* Price */}
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateSubItem(index, "price", e.target.value)}
              className="sm:w-32 mb-2 py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800
          text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition w-full sm:flex-none"
            />
            {/* Remove Button */}
            {subItems.length > 1 && (
              <button
                onClick={() => removeSubItem(index)}
                className="h-12 px-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition w-full sm:w-auto"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          onClick={addSubItem}
          className="w-full px-4 h-12 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
        >
          + Add Sub-item
        </button>
      </div>

      {/* Participants */}
      <div className="flex flex-wrap gap-3">
        {members.map(m => (
          <label
            key={m}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer
              border border-zinc-800 transition
              ${participants.includes(m) ? "bg-green-600 text-white" : "bg-red-900 text-zinc-300"}
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

      {/* Add Expense */}
      <button
        onClick={handleSubmit}
        className="w-full px-4 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
          bg-slate-800 text-white hover:bg-slate-700 cursor-pointer"
      >
        Add Expense
      </button>
    </div>
  );
}