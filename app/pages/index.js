import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useUserProfile } from '../hooks/todo'
import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar/Navbar'

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

    // useEffect(() => {
    //     if (router.pathname === '/' ) {
    //         router.push('/main');
    //     }

    //     if (initialized) {
    //         router.push('/main');
    //     }
    //     // console.log('initialized: ', initialized)

    //     if (!initialized && router.pathname !== '/login') {
    //         router.push('/login');
    //     }
    // });

    useEffect(() => {
        if(router.pathname === '/') {
            router.push('/main');
        }
    }, [initialized]);

    return (
        <div className={styles.container}>
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
                        Initialize
                    </button>
                </div>
                {/* <WalletMultiButton /> */}
            </div>
        </div> 
    );
}

export default Home
