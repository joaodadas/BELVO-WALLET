// src/pages/Login.tsx

import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LockIcon from '@mui/icons-material/Lock'; // ícone opcional

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/wallet');
    } catch {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ background: 'linear-gradient(to right, #0f172a, #1e293b)' }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          backgroundColor: '#101418',
          border: '1px solid #2C2C2E',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="white"
          textAlign="center"
          gutterBottom
          pb={5}
        >
          Belvo Wallet
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Stack dos inputs */}
          <Stack spacing={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              InputLabelProps={{ style: { color: '#ccc' } }}
              InputProps={{ style: { color: 'white' } }}
            />
            {error && (
              <Typography color="error" fontSize="0.9rem">
                {error}
              </Typography>
            )}
          </Stack>

          {/* Stack do botão com espaçamento top */}
          <Stack mt={3}>
            <Button
              variant="contained"
              type="submit"
              fullWidth
              startIcon={<LockIcon />}
              sx={{
                background: '#4f46e5',
                color: '#fff',
                fontWeight: 'bold',
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: '#4338ca',
                  transform: 'translateY(-1px)',
                },
                '&:active': {
                  transform: 'scale(0.98)',
                },
              }}
            >
              Sign In
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
