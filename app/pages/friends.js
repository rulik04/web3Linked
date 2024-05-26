// MainPage.js
import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import SideBar from '../components/sidebar/SideBar';
import Friends from '../components/friends/Friends';
import { useUserProfile } from '../hooks/todo';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const FriendsPage = () => {
    const { name } = useUserProfile();
    const router = useRouter();

    useEffect(() => {
        if (name === '') {
            router.push('/login');
        }
    }, [name]);

    return (
        <div>
            <Navbar />
            <h1 className='text-center mb-10 mt-5'>This is the Friends Page!</h1>
            <div className='flex gap-5 justify-around'>
                <div className='w-1/2'>
                    <Friends/>
                </div>
                <div className='w-1/4'>
                    <SideBar/>
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;
