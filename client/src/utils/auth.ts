// client/src/utils/auth.ts

// Get the JWT token from localStorage
export function getToken(): string | null {
  return localStorage.getItem('id_token');
}

// Check if user is logged in by verifying the presence of a token
export function loggedIn(): boolean {
  return !!getToken();
}

// Log in the user by saving the token and redirecting to home
export function login(token: string): void {
  localStorage.setItem('id_token', token);
  window.location.assign('/');
}

// Log out the user by removing the token and redirecting to home
export function logout(): void {
  localStorage.removeItem('id_token');
  window.location.assign('/');
}

// Default export for object-style usage
export default {
  getToken,
  loggedIn,
  login,
  logout,
};
