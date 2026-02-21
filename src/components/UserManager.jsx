import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function UserManager({ members, setMembers }) {
  const [name, setName] = useState("");

  const addMember = () => {
    if (!name.trim()) return;

    if (members.includes(name.trim())) {
      alert("User already exists");
      return;
    }

    setMembers([...members, name.trim()]);
    setName("");
  };

  const removeMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 shadow-lg mb-8">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={addMember}
          className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {members.map((member) => (
          <motion.div
            key={member}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-between items-center p-3 rounded-lg bg-slate-100 dark:bg-slate-700"
          >
            <span>{member}</span>
            <button
              onClick={() => removeMember(member)}
              className="text-rose-500 hover:text-rose-600 font-medium"
            >
              Remove
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}