import { useState, useEffect } from "react";
import GroupSelector from "./components/GroupSelector";
import ExpenseForm from "./components/ExpenseForm";
import BalanceCards from "./components/BalanceCards";
import SettlementList from "./components/SettlementList";
import UserManager from "./components/UserManager";
import { calculateSettlement } from "./utils/calculateSettlement";
import ExpenseList from "./components/ExpenseList.JSX";

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

    setGroups(
      groups.map((g) =>
        g.id === activeGroupId ? updatedGroup : g
      )
    );
  }
  function addExpense({ paidBy, amount, participants }) {
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
        },
      ],
      balances: updatedBalances,
    };

    setGroups(
      groups.map((g) =>
        g.id === activeGroupId ? updatedGroup : g
      )
    );
  }
  const settlements = calculateSettlement(
    activeGroup?.balances || {}
  );

  return (
    <div
      className={
        dark
          ? "dark bg-slate-900 text-white min-h-screen p-8"
          : "bg-slate-100 text-slate-900 min-h-screen p-8"
      }
    >
      <button
        onClick={() => setDark(!dark)}
        className="mb-6 px-4 py-2 rounded-lg bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 transition"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>

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
        <ExpenseList expenses={activeGroup.expenses} />
      )}
      {settlements.length > 0 && (
        <SettlementList settlements={settlements} />
      )}
    </div>
  );
}