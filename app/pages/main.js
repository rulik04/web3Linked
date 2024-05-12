// MainPage.js
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';

const MainPage = () => {
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests, allProfileAccounts } = useUserProfile();

    return (
        <div>
            <Navbar />
            <h1>Welcome to the Main Page!</h1>
            <div>
            <h2>Users:</h2> 
                <ul className=''>
                    {allProfileAccounts.map((item, index) => (
                        <li key={index} className='bg-gray-400 mb-4 w-1/2 flex gap-5 p-3'>
                            <div className="bg-white w-24 h-24 rounded-full flex justify-center items-center">
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <p>{item.account.name}</p>
                                <p>{item.publicKey.toString()}</p>    
                            </div>
                            <button className="bg-sky-900 w-1/3 rounded-md hover:bg-sky-800 text-white text-lg" onClick={() => sendFriendRequest(item.publicKey.toString())}>Send Friend Request</button>
                            
                        </li>
                    ))}
                </ul>

            </div>

            <WalletMultiButton />
        </div>
    );
}

export default MainPage;
