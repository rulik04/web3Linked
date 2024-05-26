import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';
import { uploadToPinata } from '../utils/pinata';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CreatePostPage = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const router = useRouter();

    // useEffect(() => {
    //     if (name === '') {
    //         router.push('/login');
    //     }
    // }, [name]);
    const { addPost, addComment } = useUserProfile();

    const handleSubmit = async () => {

        addComment(content, new Date().toString(), "CLU3Die3fEaQ9iN6v6ZNBoEqdaDTgUPXVrn7H4M52Ztj");

    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto p-4 text-black ">
                <div className="mb-4">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write your post..."
                        className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Submit Post
                    </button>
                </div>
            </div>
            <div className="fixed bottom-4 right-4">
                <WalletMultiButton className="!bg-blue-500 !text-white hover:!bg-blue-600" />
            </div>
        </div>
    );
};

export default CreatePostPage;
