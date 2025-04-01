const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getWallet(token: string) {
  const res = await fetch(`${API_BASE_URL}/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function sendCrypto(
  token: string,
  data: {
    receiver: string;
    currency: string;
    amount: number;
    description?: string;
  }
) {
  const res = await fetch(`${API_BASE_URL}/wallet/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Send failed');
  return res.json();
}

export async function requestCrypto(
  token: string,
  data: {
    sender: string;
    currency: string;
    amount: number;
    description?: string;
  }
) {
  const res = await fetch(`${API_BASE_URL}/wallet/request`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Request failed');
  return res.json();
}

export async function getContacts(token: string) {
  const res = await fetch(`${API_BASE_URL}/contacts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Could not fetch contacts');

  const data = await res.json();
  console.log('Contatos recebidos:', data);
  return data;
}
