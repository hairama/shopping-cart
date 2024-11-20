import React, { useState } from 'react';
import { auth } from '../storage/firebase'; // Import auth from your firebase.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from './AuthProvider';

interface User {
  email: string;
  uid: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId, setUserId } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      setUser({
        email: newUser.email!,
        uid: newUser.uid,
      });
      if (newUser.uid !== null) {setUserId(newUser.uid)}
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      setUser({
        email: loggedInUser.email!,
        uid: loggedInUser.uid,
      });
      if (loggedInUser.uid !== null) {setUserId(loggedInUser.uid)}
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    setUser(null);
    try {
      await signOut(auth);
      setUserId(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      userId? <p>{`Your user ID is: ${userId}`}</p>
      {user? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={isLoading}>Log In</button>
          </form>
          <p>or</p>
          <form onSubmit={handleSignUp}>
            <button type="submit" disabled={isLoading}>Sign Up</button>
          </form>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
