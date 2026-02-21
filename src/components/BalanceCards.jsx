import { motion } from "framer-motion";

export default function BalanceCards({ balances }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {Object.keys(balances).map((person) => {
        const value = balances[person];

        return (
          <motion.div
            key={person}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 shadow-lg backdrop-blur bg-white/70 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold mb-3">{person}</h3>

            {value > 0 && (
              <p className="text-emerald-500 font-bold text-xl">
                + ₹{value.toFixed(2)}
              </p>
            )}

            {value < 0 && (
              <p className="text-rose-500 font-bold text-xl">
                - ₹{Math.abs(value).toFixed(2)}
              </p>
            )}

            {value === 0 && (
              <p className="text-slate-400 font-medium">Settled</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}