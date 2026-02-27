import { motion, AnimatePresence } from "framer-motion";

const ExpenseList = ({ expenses }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold dark:text-white tracking-tight">
        Expense History
      </h2>

      {expenses.length === 0 && (
        <p className="text-zinc-500 py-6 border border-dashed border-zinc-800 rounded-xl text-center">
          No expenses yet.
        </p>
      )}

      <div className="space-y-4">
        <AnimatePresence>
          {expenses.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="flex justify-between items-center
                px-5 py-4 rounded-xl
                bg-zinc-900 border border-zinc-800
                shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                hover:bg-zinc-800 transition-all"
            >
              <span className="text-sm text-white font-medium">
                {exp.paidBy}
              </span>
              <span className="text-sm text-zinc-300 font-semibold">
                ₹{exp.amount.toFixed(2)}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExpenseList;