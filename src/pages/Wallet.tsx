import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getWallet } from '../services/wallet';
import { SendCryptoForm } from '../components/SendCryptoForm';
import { RequestCryptoForm } from '../components/RequestCryptoForm';
import { WalletChart } from '../components/WalletChart';

export default function WalletPage() {
  const { token } = useAuth();
  const [wallet, setWallet] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token) return;
    getWallet(token)
      .then(setWallet)
      .catch(() => setError(true));
  }, [token]);

  if (!token || error) return <Typography color="error">Unauthorized</Typography>;

  if (!wallet) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const totalUSD =
    wallet.balance.BTC * 60000 +
    wallet.balance.ETH * 3000 +
    wallet.balance.DOGE * 0.1;

  return (
    <Box sx={{ p: 3, minHeight: '100vh', background: 'linear-gradient(to right, #0f172a, #1e293b)' }}>
      <Typography variant="h4" fontWeight="bold" color="white" mb={1}>
        Wallet Dashboard
      </Typography>

      <Typography variant="h6" fontWeight="medium" color="white" mb={3}>
        💰 Estimated Portfolio Value:{' '}
        <Typography component="span" fontWeight="bold" color="white">
          ${totalUSD.toFixed(2)}
        </Typography>
      </Typography>

      <Grid container spacing={3}>
        {/* Balance Cards */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {['ETH', 'BTC', 'DOGE'].map((currency) => (
              <Grid item xs={12} md={4} key={currency}>
                <Card sx={{ backgroundColor: '#101418', p: 2, color: 'white', border: '1px solid #2C2C2E' }}>
                  <Stack direction="column" spacing={1}>
                    <Typography variant="body2" color="gray">
                      {currency} Balance
                    </Typography>
                    <Typography variant="h6" fontWeight="bold">
                      {wallet.balance[currency]} {currency}
                    </Typography>
                  </Stack>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Chart */}
        <Grid item xs={12}>
          <WalletChart balance={wallet.balance} />
        </Grid>

        {/* Forms */}
        <Grid item xs={12} md={6}>
          <SendCryptoForm onSuccess={() => getWallet(token).then(setWallet)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RequestCryptoForm />
        </Grid>

        {/* Transactions */}
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: '#101418', borderRadius: 2, border: '1px solid #2C2C2E', color: 'white' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Transactions
              </Typography>
              {wallet.transactions.map((tx: any, index: number) => (
                <Box key={index} mt={2} mb={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                    <Box>
                      <Typography variant="body2" color="gray">
                        To
                      </Typography>
                      <Typography fontWeight="bold">{tx.receiver}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="gray">
                        Amount
                      </Typography>
                      <Typography fontWeight="bold">{tx.amount} {tx.currency}</Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="gray">
                        Status
                      </Typography>
                      <Typography fontWeight="bold" color={
                        tx.status === 'Done' ? 'success.main' :
                        tx.status === 'Pending' ? 'warning.main' :
                        'error.main'
                      }>
                        {tx.status}
                      </Typography>
                    </Box>
                  </Stack>
                  {tx.created_at && (
                    <Typography fontSize="0.75rem" mt={1} color="gray">
                      {new Date(tx.created_at).toLocaleString()}
                    </Typography>
                  )}
                  {index !== wallet.transactions.length - 1 && <Divider sx={{ mt: 2, mb: 2, background: '#333' }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
