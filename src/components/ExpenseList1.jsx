import { motion, AnimatePresence } from "framer-motion";
const parseDate = (dateStr) => {
  if (!dateStr) return "Unknown Date";
  const parts = dateStr.split("-"); // expects YYYY-MM-DD
  if (parts.length !== 3) return dateStr;
  const [year, month, day] = parts;
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
function groupByDate(expenses) {
  return expenses.reduce((acc, exp) => {
    if (!acc[exp.date]) acc[exp.date] = [];
    acc[exp.date].push(exp);
    return acc;
  }, {});
}

const ExpenseList = ({ expenses }) => {
  const groupedExpenses = groupByDate(expenses);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold dark:text-white tracking-tight">
        Expense History
      </h2>

      {expenses.length === 0 && (
        <p className="text-zinc-500 py-6 border border-dashed border-zinc-800 rounded-xl text-center">
          No expenses yet.
        </p>
      )}

      {Object.keys(groupedExpenses).map((date) => {
        // Safe date parsing to avoid "Invalid Date"
        const [year, month, day] = date.split("-");
        const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
          undefined,
          { weekday: "short", year: "numeric", month: "short", day: "numeric" }
        );

        return (
          <div key={date} className="space-y-3">
            {/* Date Header */}
            <h3 className="text-lg font-medium text-zinc-400">{parseDate(date)}</h3>
            <AnimatePresence>
              {groupedExpenses[date].map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                    hover:bg-zinc-800 transition-all"
                >
                  {/* Payer and Total */}
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-yellow-300">Paid By: </span>
                      <span className="text-white font-semibold">{exp.paidBy}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">
                      ₹{exp.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Participants */}

                  <div className="flex flex-wrap gap-2 mb-2">
                    <p className="text-sm text-yellow-300">Shared between</p>
                    {exp.participants.map((p) => (
                      <span
                        key={p}
                        className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-zinc-300"
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Sub-items if any */}
                  {exp.details && exp.details.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {exp.details.map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 text-sm"
                        >
                          <span>{item.name}</span>
                          <span>₹{item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseList;