import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useUserProfile } from '../hooks/todo'; // Assuming this hook handles user profile-related actions

const SignIn = () => {
    const { publicKey } = useWallet();
    const { initialized, initializeUser } = useUserProfile();
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async () => {
        if (!publicKey) {
            setError('Please connect your wallet');
            return;
        }

        if (!username.trim()) {
            setError('Please enter a username');
            return;
        }

        try {
            await initializeUser(username);
            // Optionally, redirect the user to another page after sign-in
        } catch (err) {
            console.error('Error signing in:', err);
            setError('Error signing in. Please try again.');
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    );
};

export default SignIn;
