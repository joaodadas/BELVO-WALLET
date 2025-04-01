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

  if (!token || error)
    return <Typography color="error">Unauthorized</Typography>;

  if (!wallet) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const totalUSD =
    wallet.balance.BTC * 60000 +
    wallet.balance.ETH * 3000 +
    wallet.balance.DOGE * 0.1;

  return (
    <Box
      sx={{
        p: 3,
        minHeight: '100vh',
        background: 'linear-gradient(to right, #0f172a, #1e293b)',
      }}
    >
      <Typography variant="h4" fontWeight="bold" color="white" mb={2}>
        Wallet Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* USD CARD */}
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: '#101418',
              p: 2,
              color: 'white',
              border: '1px solid #2C2C2E',
              height: '100%',
            }}
          >
            <Stack spacing={1}>
              <Typography variant="body2" color="gray">
                USD Value 
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {totalUSD.toFixed(2)} USD
              </Typography>
            </Stack>
          </Card>
        </Grid>

        {/* BALANCE CARDS */}
        {['ETH', 'BTC', 'DOGE'].map((currency) => (
          <Grid item xs={12} sm={6} md={3} key={currency}>
            <Card
              sx={{
                backgroundColor: '#101418',
                p: 2,
                color: 'white',
                border: '1px solid #2C2C2E',
                height: '100%',
              }}
            >
              <Stack spacing={1}>
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

      {/* CHART */}
      <Grid item xs={12} mt={3}>
        <WalletChart balance={wallet.balance} />
      </Grid>

      {/* FORMS */}
      <Grid container spacing={3} mt={1}>
        <Grid item xs={12} md={6}>
          <SendCryptoForm onSuccess={() => getWallet(token).then(setWallet)} />
        </Grid>
        <Grid item xs={12} md={6}>
          <RequestCryptoForm />
        </Grid>
      </Grid>

      {/* TRANSACTIONS */}
      <Grid item xs={12} mt={3}>
        <Card
          sx={{
            backgroundColor: '#101418',
            borderRadius: 2,
            border: '1px solid #2C2C2E',
            color: 'white',
            mt: 2,
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Transactions
            </Typography>
            {wallet.transactions.map((tx: any, index: number) => (
              <Box key={index} mt={2} mb={2}>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  justifyContent="space-between"
                  alignItems={{ xs: 'flex-start', sm: 'center' }}
                  spacing={2}
                >
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
                    <Typography fontWeight="bold">
                      {tx.amount} {tx.currency}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="gray">
                      Status
                    </Typography>
                    <Typography
                      fontWeight="bold"
                      color={
                        tx.status === 'Done'
                          ? 'success.main'
                          : tx.status === 'Pending'
                          ? 'warning.main'
                          : 'error.main'
                      }
                    >
                      {tx.status}
                    </Typography>
                  </Box>
                </Stack>
                {tx.created_at && (
                  <Typography fontSize="0.75rem" mt={1} color="gray">
                    {new Date(tx.created_at).toLocaleString()}
                  </Typography>
                )}
                {index !== wallet.transactions.length - 1 && (
                  <Divider sx={{ mt: 2, mb: 2, background: '#333' }} />
                )}
              </Box>
            ))}
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
