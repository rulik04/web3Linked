// MainPage.js
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/SidebarNew';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';
import Post from '../components/post/Post';
import ProfilePictureUpload from '../components/ProfilePictureUpload';

const TestPage = () => {
    return (
        <div>
            <Navbar />
            <ProfilePictureUpload />
            <WalletMultiButton />
        </div>
    );
}

export default TestPage;
