import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TransactionSummary } from '@/types/transaction';
import { BarChart3 } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ExpenseChartProps {
  summary: TransactionSummary;
}

export const ExpenseChart = ({ summary }: ExpenseChartProps) => {
  const chartRef = useRef<ChartJS<'bar'>>(null);

  const data = {
    labels: ['Income', 'Expenses', 'Net Balance'],
    datasets: [
      {
        label: 'Amount (₦)',
        data: [
          summary.totalIncome,
          summary.totalExpenses,
          Math.abs(summary.balance),
        ],
        backgroundColor: [
          'hsl(142 76% 36% / 0.8)',  // Success color for income
          'hsl(0 84% 60% / 0.8)',    // Destructive color for expenses
          summary.balance >= 0 ? 'hsl(263 85% 60% / 0.8)' : 'hsl(0 84% 60% / 0.8)', // Primary or destructive for balance
        ],
        borderColor: [
          'hsl(142 76% 36%)',
          'hsl(0 84% 60%)',
          summary.balance >= 0 ? 'hsl(263 85% 60%)' : 'hsl(0 84% 60%)',
        ],
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'hsl(240 10% 8%)',
        titleColor: 'hsl(240 5% 98%)',
        bodyColor: 'hsl(240 5% 98%)',
        borderColor: 'hsl(240 4% 16%)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            return `₦${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(240 6% 90% / 0.3)',
        },
        ticks: {
          color: 'hsl(240 4% 46%)',
          callback: function(value: any) {
            return '₦' + value.toLocaleString();
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: 'hsl(240 4% 46%)',
        },
      },
    },
  };

  return (
    <Card className="shadow-card border-0 bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Financial Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar ref={chartRef} data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};