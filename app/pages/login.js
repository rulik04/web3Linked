import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useUserProfile } from '../hooks/todo'
import styles from '../styles/Home.module.css'

const Home = () => {
    const router = useRouter();
    const [username, setUsername] = useState('')
    const [friendRequest, setFriendRequest] = useState('')
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, name } = useUserProfile()

    const handleInitializeUser = () => {
        if (username.trim() !== '') {
            initializeUser(username.trim())
        }
    }
    useEffect(() => {
        if (initialized) {
            router.push('/main');
        }
    }, [initialized, router]);
    return (
        <div className="flex justify-center items-center h-full w-full">
            <div className="">
                <WalletMultiButton />
                <div className="flex justify-between mt-5 mb-10">
                    <div>
                        <label className="text-lg font-bold flex mb-2">Username</label>
                        <input 
                            type="text" 
                            className="w-1/3 h-10 p-3 border rounded-md border-slate-200 mr-2" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <button 
                            type="button" 
                            className="bg-gray-400 w-24 h-10 rounded-md" 
                            onClick={handleInitializeUser} 
                        >
                            Initialize user
                        </button>
                    </div>
                </div>
                
            </div>
            
        </div> 
    );
}

export default Home
