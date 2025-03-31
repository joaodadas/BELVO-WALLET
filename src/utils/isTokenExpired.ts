import { jwtDecode } from 'jwt-decode';

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (e) {
    return true;
  }
}

export function getTokenExpirationTime(token: string): number {
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000;
  } catch {
    return 0;
  }
}
