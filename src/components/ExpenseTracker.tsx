import { useTransactions } from '@/hooks/useTransactions';
import { SummaryCards } from './SummaryCards';
import { TransactionForm } from './TransactionForm';
import { TransactionList } from './TransactionList';
import { ExpenseChart } from './ExpenseChart';
import { toast } from '@/hooks/use-toast';

export const ExpenseTracker = () => {
  const { transactions, addTransaction, deleteTransaction, summary } = useTransactions();

  const handleAddTransaction = (transaction: { description: string; amount: number; type: 'income' | 'expense' }) => {
    addTransaction(transaction);
    toast({
      title: "Transaction added",
      description: `${transaction.type === 'income' ? 'Income' : 'Expense'} of ₦${transaction.amount.toFixed(2)} has been recorded.`,
    });
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    toast({
      title: "Transaction deleted",
      description: "The transaction has been successfully removed.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-muted-foreground text-lg">
            Take control of your finances with beautiful insights
          </p>
        </div>

        {/* Summary Cards */}
        <SummaryCards summary={summary} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Form */}
          <div className="lg:col-span-1">
            <TransactionForm onSubmit={handleAddTransaction} />
          </div>

          {/* Chart */}
          <div className="lg:col-span-2">
            <ExpenseChart summary={summary} />
          </div>
        </div>

        {/* Transaction List */}
        <TransactionList 
          transactions={transactions} 
          onDelete={handleDeleteTransaction} 
        />
      </div>
    </div>
  );
};