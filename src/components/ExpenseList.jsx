import { motion } from "framer-motion";

export default function ExpenseList({ expenses }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3">Expense History</h2>

      {expenses.map((exp) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-2"
        >
          {exp.paidBy} paid ₹{exp.amount}
        </motion.div>
      ))}
    </div>
  );
}