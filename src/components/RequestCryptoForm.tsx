import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { getContacts, requestCrypto } from '../services/wallet';

export function RequestCryptoForm() {
  const { token } = useAuth();
  const [sender, setSender] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('BTC');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [contacts, setContacts] = useState<{ email: string; name: string }[]>(
    []
  );

  useEffect(() => {
    if (!token) return;
    getContacts(token)
      .then((data) => {
        setContacts(data);
      })
      .catch(() => setContacts([]));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!sender || !amount || isNaN(+amount) || +amount <= 0) {
      setError('Please provide valid values.');
      return;
    }

    try {
      await requestCrypto(token!, {
        sender,
        amount: parseFloat(amount),
        currency,
        description,
      });
      setSuccessMsg('Crypto request sent!');
      setSender('');
      setAmount('');
      setCurrency('BTC');
      setDescription('');
    } catch (err) {
      setError('Failed to request crypto.');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" fontWeight="bold" gutterBottom color="white">
        Request Cryptocurrency
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            select
            label="From"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            fullWidth
          >
            {contacts.map((c) => (
              <MenuItem key={c.email} value={c.email}>
                {c.name} ({c.email})
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
          />
          <TextField
            select
            label="Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            fullWidth
          >
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="DOGE">DOGE</MenuItem>
          </TextField>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
          />

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
            Request
          </Button>

          {error && <Typography color="error">{error}</Typography>}
          {successMsg && <Typography color="success.main">{successMsg}</Typography>}
        </Stack>
      </form>
    </Box>
  );
}
