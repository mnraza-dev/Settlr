export default function SettlementList({ settlements }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Settlements</h2>

      {settlements.length === 0 && <p>All settled!</p>}

      {settlements.map((s, index) => (
      <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 shadow-sm">
  <span className="font-semibold text-rose-500">{s.from}</span>
  <span className="mx-2 text-slate-400">→</span>
  <span className="font-semibold text-emerald-500">{s.to}</span>
  <span className="ml-2 font-bold">₹{s.amount.toFixed(2)}</span>
</div>
      ))}
    </div>
  );
}