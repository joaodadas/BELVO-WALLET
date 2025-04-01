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
import { motion } from 'framer-motion';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
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
            </motion.div>
          </Grid>

          {/* BALANCE CARDS */}
          {['ETH', 'BTC', 'DOGE'].map((currency, i) => (
            <Grid item xs={12} sm={6} md={3} key={currency}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
              >
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
              </motion.div>
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
              px: 2,
              pb: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Recent Transactions
              </Typography>

              {wallet.transactions.map((tx: any, index: number) => (
                <Box key={index} mt={2}>
                  <Grid
                    container
                    spacing={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    {/* Receiver */}
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="gray">
                        To
                      </Typography>
                      <Typography fontWeight="bold" noWrap>
                        {tx.receiver}
                      </Typography>
                    </Grid>

                    {/* Amount centralizado no desktop */}
                    <Grid
                      item
                      xs={12}
                      sm={1.5}
                      sx={{
                        textAlign: {
                          xs: 'left',
                          sm: 'left',
                        },
                      }}
                    >
                      <Typography variant="body2" color="gray">
                        Amount
                      </Typography>
                      <Typography fontWeight="bold" noWrap>
                        {tx.amount} {tx.currency}
                      </Typography>
                    </Grid>

                    {/* Status */}
                    <Grid
                      item
                      xs={12}
                      sm={4}
                      sx={{
                        textAlign: {
                          xs: 'left',
                          sm: 'right',
                        },
                      }}
                    >
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
                    </Grid>
                  </Grid>

                  {/* Timestamp */}
                  {tx.created_at && (
                    <Typography fontSize="0.75rem" mt={1} color="gray">
                      {new Date(tx.created_at).toLocaleString()}
                    </Typography>
                  )}

                  {/* Divider */}
                  {index !== wallet.transactions.length - 1 && (
                    <Divider sx={{ mt: 2, background: '#333' }} />
                  )}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </motion.div>
  );
}