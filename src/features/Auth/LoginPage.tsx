import React, { useEffect, useState } from 'react';
import { auth } from '../storage/firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useAuth } from './AuthProvider';
import { Timestamp } from 'firebase/firestore';
import { useFirebaseUpdate, useUserData } from '../storage/index'
import { UserData } from "../Auth/AuthProvider"
import BackArrowButton from '../../components/BackArrowButton';
import { getEmailFromStorage, saveEmailToStorage } from '../storage/localStorage';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('')
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, setUser } = useAuth()
  const [uidForFetch] = useState<string | null>(null)

  useEffect(() => {
    const savedEmail = getEmailFromStorage()
    if (savedEmail) {
      setEmail(savedEmail)
    }
  })

  //@ts-ignore
  let fbUserData = uidForFetch ? useUserData(uidForFetch) : null;

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
      
        function toFirebaseUserData(user: UserData): Omit<UserData, 'uid'> {
            const { uid, ...data } = user;
            return data;
          }
          
            // Call the update hook with the new status
            const updateUserData = useFirebaseUpdate(`users/${userData.uid}`, toFirebaseUserData(userData));
            updateUserData(); 
            saveEmailToStorage(email)

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
      const userID = loggedInUser.uid;
  
      // Fetch user data from Firestore/Database
      const userSnapshot = await useUserData(userID);
      if (userSnapshot.exists()) {
        const fbUserData = userSnapshot.val(); 
  
        // Update user context with fetched data
        setUser({
          uid: userID,
          email: fbUserData.email,
          first_name: fbUserData.first_name,
          created_at: fbUserData.created_at,
          shared_lists: fbUserData.shared_lists,
        });
        saveEmailToStorage(email)
      } else {
        console.error("User data not found in the database.");
        setError("User data not found.");
      }
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
      <BackArrowButton 
        view={"home-page"}
      />
      <h1>Login</h1>
      {user? (
        <div>
          <h2>Hi, {user.first_name}</h2>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      ) : (
        <div>
          <form onSubmit={handleLogin}>
            <div>
              <label>Email</label>
              <input
                name="username"
                type="email"
                autoComplete='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password</label>
              <input
                name="password"
                type="password"
                autoComplete='current-password'
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
