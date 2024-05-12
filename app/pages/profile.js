// MainPage.js
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo'; 

const ProfilePage = () => {
    
    const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests } = useUserProfile();



    return (
        <div>
            <Navbar />
            <h1 className="text-center text-xl font-bold mt-3">Your profile</h1>
            <main className="rounded-md my-5 mx-64 flex gap-5">
                <div className="bg-lime-800 w-1/3 h-96 rounded-md flex flex-col items-center pt-5">
                    <div className="bg-white w-24 h-24 rounded-full mb-3 flex justify-center items-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            class="w-6 h-6  "
                        >
                            <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                            clip-rule="evenodd"
                            />
                        </svg>
                    </div>
                    <span className="text-white text-2xl font-semibold mb-5">{name}</span>
                    <ul>
                        <li className='flex justify-between'>
                            <p>Phone:</p>
                            <p>87765084433</p>
                        </li>
                        <li className='flex justify-between gap-3'>
                            <p>Email:</p>
                            <p>220625@astanait.edu.kz</p>
                        </li>
                    </ul>
                    <button className="bg-white w-1/2 h-10 mt-5 rounded-md text-lime-800 font-bold">Edit Profile</button>
                </div>
                <div className="bg-teal-400 w-full h-96 rounded-md">
                    <h2 className="text-white text-2xl font-semibold my-5 text-center">Friends</h2>
                    <ul className='flex flex-col items-center'>
                        {friends.map((friend, index) => (
                            <li key={index} className="w-3/4 h-full bg-slate-600 rounded-xl flex justify-center items-center p-3 gap-3">
                                <div className="bg-white w-16 h-16 rounded-full"  >
                                </div>
                                {friend}
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;
