import { motion } from "framer-motion";

export default function BalanceCards({ balances }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      {Object.keys(balances).map((person, index) => {
        const value = balances[person];

        return (
          <motion.div
            key={person}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.6)]
              bg-zinc-900 border border-zinc-800
              hover:shadow-[0_15px_50px_rgba(0,0,0,0.7)]
              transition-all"
          >
            <h3 className="text-lg font-semibold text-white mb-3">
              {person}
            </h3>

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
              <p className="text-zinc-500 font-medium">Settled</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}