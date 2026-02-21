export function calculateSettlement(balances) {
  const debtors = [];
  const creditors = [];

  for (let person in balances) {
    if (balances[person] < 0)
      debtors.push({ person, amount: -balances[person] });

    if (balances[person] > 0)
      creditors.push({ person, amount: balances[person] });
  }

  const settlements = [];

  debtors.forEach((debtor) => {
    creditors.forEach((creditor) => {
      if (debtor.amount > 0 && creditor.amount > 0) {
        const min = Math.min(debtor.amount, creditor.amount);

        settlements.push({
          from: debtor.person,
          to: creditor.person,
          amount: min,
        });

        debtor.amount -= min;
        creditor.amount -= min;
      }
    });
  });

  return settlements;
}