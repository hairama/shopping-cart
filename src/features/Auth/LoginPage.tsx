import React, { useState } from 'react';
import { auth } from '../storage/firebase'; // Import auth from your firebase.ts
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from './AuthProvider';
import { Timestamp } from 'firebase/firestore';
import { useFirebaseUpdate, useFirebaseData } from '../storage/index'
import { UserData } from "../Auth/AuthProvider"

// interface UserData {
//   email: string;
//   uid: string;
// }

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useAuth()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      const timestamp = Timestamp.now()
      const userData: UserData = {
        uid: newUser.uid,
        email: newUser.email!,
        first_name: firstName,
        created_at: timestamp,
        shared_lists: []
      }
      setUser(userData)
      console.log(userData)
      console.log(user === null)
      
        function toFirebaseUserData(user: UserData): Omit<UserData, 'uid'> {
            const { uid, ...data } = user;
            return data;
          }
          
            // Call the update hook with the new status
            const updateUserData = useFirebaseUpdate(`users/${userData.uid}`, toFirebaseUserData(userData));
            updateUserData(); // Trigger the update operation

      
      

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
      setUser(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {user? (
        <div>
          <h2>Welcome, {user.first_name}</h2>
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
            <div>
              <label>First name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
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
