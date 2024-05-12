import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';

const NotificationsPage = () => {
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, rejectFriendRequest, allProfileAccounts, acceptFriendRequest, friends, name, requests, sentRequests } = useUserProfile();
    const [pendingRequestsUsers, setPendingRequestsUsers] = useState([]);

    useEffect(() => {
        const pendingRequestsUsers = allProfileAccounts.filter(item => requests.includes(item.publicKey.toString()));
        setPendingRequestsUsers(pendingRequestsUsers);
    }, [allProfileAccounts, requests]);

    return (
        <div>
            <Navbar />
            <h1>Welcome to the Main Page!</h1>
            <div>
                <h2>Pending Friend Requests:</h2> 
                <ul className=''>
                    {pendingRequestsUsers.map((item, index) => (
                        <li key={index} className='bg-gray-400 mb-4 w-1/2 flex gap-5 p-3'>
                            <div className="bg-white w-24 h-24 rounded-full flex justify-center items-center">
                            </div>
                            <div className='flex flex-col justify-center gap-2'>
                                <p>{item.account.name}</p>
                                <p>{item.publicKey.toString()}</p>    
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-green-500 w-1/3 rounded-md hover:bg-green-400 text-white text-lg" onClick={() => acceptFriendRequest(item.publicKey.toString())}>Accept</button>
                                <button className="bg-red-500 w-1/3 rounded-md hover:bg-red-400 text-white text-lg" onClick={() => rejectFriendRequest(item.publicKey.toString())}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <WalletMultiButton />
        </div>
    );
};

export default NotificationsPage;
