// import React, { useState } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { useUserProfile } from '../hooks/todo'; 

// const CreatePostPage = () => {
//     const [content, setContent] = useState('');
//     const [image, setImage] = useState('');

    


//     const { addPost} = useUserProfile()      
//     // Function to handle post submission
//     const handleSubmit = async () => {
//         // Here you can perform actions like submitting the post to the backend
//         console.log('Post submitted:', { content, image });
//         addPost(content, image, new Date().toString());
//         console.log('--------------------');
//         // Optionally, you can reset the form after submission
//         setContent('');
//         setImage('');
//     };

//     return (
//         <div>
//             {/* Navbar component */}
//             <Navbar />

//             {/* Main content */}
//             <div className="container text-black">
//                 {/* Input fields for post content and image */}
//                 <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     placeholder="Write your post..."
//                 />
//                 <input
//                     type="text"
//                     value={image}
//                     onChange={(e) => setImage(e.target.value)}
//                     placeholder="Image URL (optional)"
//                 />

//                 {/* Button to submit the post */}
//                 <button onClick={handleSubmit}>Submit Post</button>
//             </div>

//             {/* WalletMultiButton component */}
//             <WalletMultiButton />
//         </div>
//     );
// }

// export default CreatePostPage;


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
    const { addPost } = useUserProfile();

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async () => {
        let imageUrl = '';
        if (image) {
            try {
                imageUrl = await uploadToPinata(image);
            } catch (error) {
                console.error('Error uploading image to Pinata: ', error);
                alert('Error uploading image. Please try again.');
                return;
            }
        }

        console.log('Post submitted:', { content, imageUrl });

        addPost(content, imageUrl, new Date().toString());
        // setContent('');
        // setImage(null);
        // setImagePreview('');
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
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                {imagePreview && (
                    <div className="mb-4">
                        <img src={imagePreview} alt="Selected" className="mt-4 w-32 h-32 object-cover rounded-md" />
                    </div>
                )}
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
