export default function SettlementList({ settlements }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold dark:text-white tracking-tight">
        Settlements
      </h2>

      {settlements.length === 0 && (
        <p className="text-zinc-500 py-6 border border-dashed border-zinc-800 rounded-xl text-center">
          All settled! 🎉
        </p>
      )}

      <div className="space-y-4">
        {settlements.map((s, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-5 py-4 rounded-xl
              bg-zinc-900 border border-zinc-800
              shadow-[0_4px_20px_rgba(0,0,0,0.5)]
              hover:bg-zinc-800 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-rose-500">{s.from}</span>
              <span className="text-zinc-400">→</span>
              <span className="font-semibold text-emerald-500">{s.to}</span>
            </div>
            <span className="ml-2 font-bold text-white">
              ₹{s.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}