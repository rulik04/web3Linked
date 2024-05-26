// MainPage.js
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo'; 
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Post from '../components/post/Post';

const ProfilePage = () => {
    
    const { initialized,loading, transactionPending, friends, name, profilePicture, userPosts } = useUserProfile();

    const router = useRouter();

    userPosts.map((post) => {
        console.log("user post", post)
        console.log(typeof post.authority)
        console.log(typeof post.createdAt)
        console.log(typeof post.content)
        console.log(typeof post.image)
        console.log(typeof post.idx)

    })

    useEffect(() => {
        if (name === '') {
            router.push('/login');
        }
    }, [name]);

    return (
        <div>
            <Navbar />
            <h1 className="text-center text-xl font-bold mt-3">Your profile</h1>
            <main className="rounded-md my-5 mx-64 flex gap-5">
                <div className="bg-lime-800 w-1/3 h-96 rounded-md flex flex-col items-center pt-5">
                    <div className="bg-white w-24 h-24   rounded-full mb-3 flex justify-center items-center">
                        <img src={profilePicture} alt="profile picture" className="w-24 h-24 rounded-full object-cover" />
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
            <div className="w-3/4"> 
                    <div className="posts-container">
                        {/* Map through the posts data and render Post component for each */}
                        {userPosts.map((post, index) => (
                            <Post
                                key={index}
                                profileName={name}
                                profilePicture={profilePicture}
                                content={post.content}
                                postImage={post.image}
                                createdTime={post.createdAt}
                            />
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default ProfilePage;
