type BalanceMap = Record<string, number>;

type SettlementResult = {
  from: string;
  to: string;
  amount: number;
};

export function optimizeSettlements(
  balances: BalanceMap
): SettlementResult[] {
  const creditors: {
    userId: string;
    amount: number;
  }[] = [];

  const debtors: {
    userId: string;
    amount: number;
  }[] = [];

  // Split users
  for (const [userId, balance] of Object.entries(
    balances
  )) {
    if (balance > 0) {
      creditors.push({
        userId,
        amount: balance,
      });
    }

    if (balance < 0) {
      debtors.push({
        userId,
        amount: Math.abs(balance),
      });
    }
  }

  const settlements: SettlementResult[] =
    [];

  let i = 0;
  let j = 0;

  while (
    i < debtors.length &&
    j < creditors.length
  ) {
    const debtor = debtors[i];
    const creditor = creditors[j];

    const amount = Math.min(
      debtor.amount,
      creditor.amount
    );

    settlements.push({
      from: debtor.userId,
      to: creditor.userId,
      amount,
    });

    debtor.amount -= amount;
    creditor.amount -= amount;

    if (debtor.amount === 0) i++;

    if (creditor.amount === 0) j++;
  }

  return settlements;
}