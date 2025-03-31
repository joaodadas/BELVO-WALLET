import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, Typography } from '@mui/material';

interface WalletChartProps {
  balance: {
    ETH: number;
    BTC: number;
    DOGE: number;
  };
}

export function WalletChart({ balance }: WalletChartProps) {
  const chartData = [
    { day: 'Day 1', ETH: balance.ETH * 0.9, BTC: balance.BTC * 0.8, DOGE: balance.DOGE * 0.7 },
    { day: 'Day 2', ETH: balance.ETH * 0.95, BTC: balance.BTC * 0.85, DOGE: balance.DOGE * 0.9 },
    { day: 'Today', ETH: balance.ETH, BTC: balance.BTC, DOGE: balance.DOGE },
  ];

  return (
    <Card sx={{ p: 2, height: '100%', backgroundColor: '#101418', border: '1px solid #2c2c2e' }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="white">
        Portfolio History
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid stroke="#333" />
          <XAxis dataKey="day" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip contentStyle={{ backgroundColor: '#1e1e2f', border: 'none' }} labelStyle={{ color: '#fff' }} />
          <Line type="monotone" dataKey="ETH" stroke="#3f51b5" strokeWidth={2} />
          <Line type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} />
          <Line type="monotone" dataKey="DOGE" stroke="#66cc33" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
