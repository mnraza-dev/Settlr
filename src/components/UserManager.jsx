import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UserManager({ members, setMembers }) {
  const [name, setName] = useState("");

  const addMember = () => {
    if (!name.trim()) return;
    if (members.includes(name.trim())) return;

    setMembers([...members, name.trim()]);
    setName("");
  };

  const removeMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-950 
      shadow-[0_10px_40px_rgba(0,0,0,0.6)] 
      p-8 space-y-8 transition-all">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Members
          </h2>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your expense group participants
          </p>
        </div>

        <div className="text-xs text-zinc-300 bg-zinc-900 
          border border-zinc-800 px-3 py-1 rounded-full">
          {members.length} total
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row gap-4 w-full">
        {/* Input */}
        <input
          type="text"
          placeholder="Enter member name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addMember()}
          className="flex-1  rounded-xl
      bg-zinc-900 border border-zinc-800
      px-4 py-4 text-sm text-white
      placeholder:text-zinc-500
      focus:outline-none focus:ring-2 focus:ring-white/20
      transition"
        />

        {/* Button */}
        <button
          onClick={addMember}
          className="w-full md:w-auto h-12 px-6 rounded-xl text-sm font-medium
      bg-white text-black
      hover:bg-zinc-200
      active:scale-95
      transition-all"
        >
          Add
        </button>
      </div>
      {/* Members List */}
      <div className="space-y-4">
        <AnimatePresence>
          {members.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-zinc-500 py-10 border border-dashed border-zinc-800 rounded-xl"
            >
              No members yet.
            </motion.div>
          )}

          {members.map((member) => (
            <motion.div
              key={member}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center justify-between
                rounded-xl border border-zinc-800
                bg-zinc-900
                px-5 py-4
                hover:border-zinc-700
                hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]
                transition-all"
            >
              {/* Left */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center
                  rounded-full bg-zinc-800 text-white text-sm font-semibold">
                  {getInitials(member)}
                </div>

                <span className="text-sm text-white font-medium">
                  {member}
                </span>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeMember(member)}
                className="text-sm
                  cursor-pointer bg-red-500 rounded-xl
                  text-white
                  px-3 py-1
                  transition"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}