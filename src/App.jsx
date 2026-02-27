import { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import ExpenseForm from "./components/ExpenseForm";
import BalanceCards from "./components/BalanceCards";
import SettlementList from "./components/SettlementList";
import UserManager from "./components/UserManager";
import { calculateSettlement } from "./utils/calculateSettlement";
import ExpenseList1 from "./components/ExpenseList1";
import Header from "./components/Header";


export default function App() {
  const [dark, setDark] = useState(true);
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem("groups");
    return saved
      ? JSON.parse(saved)
      : [
        {
          id: 1,
          name: "My Group",
          members: [],
          expenses: [],
          balances: {},
        },
      ];
  });

  const [activeGroupId, setActiveGroup] = useState(1);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  function updateGroupMembers(newMembers) {
    const newBalances = {};
    newMembers.forEach((member) => {
      newBalances[member] = activeGroup.balances[member] || 0;
    });

    const updatedGroup = {
      ...activeGroup,
      members: newMembers,
      balances: newBalances,
    };

    setGroups(groups.map((g) =>
      g.id === activeGroupId ? updatedGroup : g
    ));
  }

  function addExpense({ paidBy, amount, participants, date, details }) {
    if (!participants.length) return;

    const share = amount / participants.length;
    const updatedBalances = { ...activeGroup.balances };

    participants.forEach((person) => {
      if (person !== paidBy) {
        updatedBalances[person] -= share;
        updatedBalances[paidBy] += share;
      }
    });

    const updatedGroup = {
      ...activeGroup,
      expenses: [
        ...activeGroup.expenses,
        {
          id: Date.now(),
          paidBy,
          amount,
          participants,
          date,
          details, // <-- Add this
        },
      ],
      balances: updatedBalances,
    };

    setGroups(groups.map((g) => (g.id === activeGroupId ? updatedGroup : g)));
  }

  const settlements = calculateSettlement(
    activeGroup?.balances || {}
  );

  return (
    <div
      className={
        dark
          ? "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-500"
          : "min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 text-slate-900 transition-all duration-500"
      }
    >
      <div className="max-w-5xl mx-auto p-2">
        <Header dark={dark} setDark={setDark} />

        {/* Glass Card Container */}
        <div
          className="backdrop-blur-lg bg-white/10 dark:bg-white/5 
          border border-white/10 rounded-2xl p-3 shadow-xl space-y-6"
        >
          <GroupSelector
            groups={groups}
            activeGroupId={activeGroupId}
            setActiveGroup={setActiveGroup}
          />

          <UserManager
            members={activeGroup.members}
            setMembers={updateGroupMembers}
          />

          {activeGroup.members.length > 0 && (
            <ExpenseForm
              members={activeGroup.members}
              onAddExpense={addExpense}
            />
          )}

          {activeGroup.members.length > 0 && (
            <BalanceCards balances={activeGroup.balances} />
          )}

          {activeGroup.expenses.length > 0 && (
            <ExpenseList1 expenses={activeGroup.expenses} />
          )}

          {settlements.length > 0 && (
            <SettlementList settlements={settlements} />
          )}
        </div>

      </div>
    </div>
  );
}