import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionSummary } from '@/types/transaction';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface SummaryCardsProps {
  summary: TransactionSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Income */}
      <Card className="shadow-card transition-smooth hover:shadow-elevated bg-card border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Income
          </CardTitle>
          <div className="h-8 w-8 rounded-lg gradient-success flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-success-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">
            {formatCurrency(summary.totalIncome)}
          </div>
        </CardContent>
      </Card>

      {/* Total Expenses */}
      <Card className="shadow-card transition-smooth hover:shadow-elevated bg-card border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Expenses
          </CardTitle>
          <div className="h-8 w-8 rounded-lg gradient-danger flex items-center justify-center">
            <TrendingDown className="h-4 w-4 text-destructive-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">
            -{formatCurrency(summary.totalExpenses)}
          </div>
        </CardContent>
      </Card>

      {/* Net Balance */}
      <Card className="shadow-card transition-smooth hover:shadow-elevated bg-card border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Net Balance
          </CardTitle>
          <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
            <DollarSign className="h-4 w-4 text-primary-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold ${
            summary.balance >= 0 ? 'text-success' : 'text-destructive'
          }`}>
            {formatCurrency(summary.balance)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};