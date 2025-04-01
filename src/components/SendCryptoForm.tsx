import { useState } from 'react';
import { Box, Button, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { sendCrypto } from '../services/wallet';

export function SendCryptoForm({ onSuccess }: { onSuccess: () => void }) {
  const { token } = useAuth();
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!receiver || !amount || isNaN(+amount) || +amount <= 0) {
      setError('Please provide valid values.');
      return;
    }

    try {
      await sendCrypto(token!, {
        receiver,
        amount: parseFloat(amount),
        currency,
        description,
      });
      setSuccessMsg('Crypto sent successfully!');
      onSuccess();
      setReceiver('');
      setAmount('');
      setCurrency('BTC');
      setDescription('');
    } catch (err) {
      console.log(err)
      setError('Failed to send crypto.');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
        Send Cryptocurrency
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField label="Receiver (email)" value={receiver} onChange={(e) => setReceiver(e.target.value)} fullWidth />
          <TextField label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth />
          <TextField select label="Currency" value={currency} onChange={(e) => setCurrency(e.target.value)} fullWidth>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="DOGE">DOGE</MenuItem>
          </TextField>
          <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} fullWidth multiline rows={2} />

          <Button
            type="submit"
            fullWidth
            sx={{
              background: '#4f46e5',
              color: '#fff',
              fontWeight: 'bold',
              py: 1.2,
              borderRadius: 2,
              textTransform: 'none',
              '&:hover': {
                background: '#4338ca',
              },
            }}
          >
            Send
          </Button>

          {error && <Typography color="error">{error}</Typography>}
          {successMsg && <Typography color="success.main">{successMsg}</Typography>}
        </Stack>
      </form>
    </Box>
  );
}
