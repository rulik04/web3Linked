// MainPage.js
import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';

const FriendsPage = () => {

    const { initialized, initializeUser, loading, removeFriend, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests } = useUserProfile();


    return (
        <div>
            <Navbar />
            <h1 className='text-center'>This is the Friends Page!</h1>
            <ul className='text-center mt-16 flex flex-col items-center'>
                <p className='text-lg font-bold'>Friends:</p>
                {friends.map((friends, index) => (
                    <li key={index} className='bg-gray-500 w-1/2 mb-5 flex justify-between p-3'>
                        <p>{friends}</p>
                        <button className='bg-red-500 w-1/3 rounded-md hover:bg-red-400 text-white text-lg' onClick={() => removeFriend(friends)}>Remove Friend</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export default FriendsPage;
