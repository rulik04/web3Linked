// // MainPage.js
// import React from 'react';
// import Navbar from '../components/navbar/Navbar';
// import Sidebar from '../components/sidebar/SidebarNew';
// import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import { useUserProfile } from '../hooks/todo';
// import Post from '../components/post/Post';

// const MainPage = () => {
//     const { initialized, initializeUser, loading, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests, allProfileAccounts } = useUserProfile();

//     return (
//         <div>
//             <Navbar />
//             <div className="flex">
//                 <div className="w-3/4"> 
//                     <div className="posts-container">
//                         <Post />
//                         <Post />
//                         <Post />
//                         <Post />
//                     </div>
//                 </div>
//                 <div className="w-1/4"> 
//                     <Sidebar />
//                 </div>
//             </div>
//             <WalletMultiButton />
//         </div>
//     );
// }

// export default MainPage;


// MainPage.js
import React from 'react';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/SidebarNew';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';
import Post from '../components/post/Post';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const MainPage = () => {
    const { initialized, loading, friends, name, profilePicture, combinedPosts, mintnft, comments} = useUserProfile(); // Assuming you have posts data available




    const router = useRouter();
    // // const mintNFT = async () => {
    // //     const uriMake = await uploadMeta();
    // //     createNft(uriMake);
    // // }

        

    // const [selectedFile, setSelectedFile] = useState(null);

    // const handleFileChange = (event) => {
    //     setSelectedFile(event.target.files[0]);
    // };

    // const handleUploadMeta = async () => {
    //     if (selectedFile) {

    //         // const uri = await uploadMeta(selectedFile);
    //         // await createNft(uri);

    //         const res = await mintnft();
    //         console.log(res);
    //     } else {
    //         toast.error('Please select a file first.');
    //     }
    // }

    useEffect(() => {
        // console.log(name);
        if (name === '') {
            router.push('/login');
        }
    }, [name]);
    return (
        <div>
            <Navbar />  
            <div className="flex">
                <div className="w-3/4"> 
                    <div className="posts-container">
                        {/* Map through the posts data and render Post component for each */}
                        {combinedPosts.map((post, index) => (
                            <Post
                                key={index}
                                profileName={post.userInfo.account.name}
                                profilePicture={post.userInfo.account.profilePicture}
                                content={post.postInfo.account.content}
                                postImage={post.postInfo.account.image}
                                likeCount={post.postInfo.account.likes}
                                createdTime={post.postInfo.account.createdAt}
                                postPublicKey={post.postInfo.publicKey}
                                
                            />
                        ))}
                    </div>
                </div>
                <div className="w-1/4"> 
                    <Sidebar />
                </div>
            </div>
            <WalletMultiButton />
        {/* <input type="file" onChange={handleFileChange} />
                    <button onClick={handleUploadMeta}>
                        Upload and Create NFT
                    </button> */}
            {/* <button onClick={mintNFT} className="w-1/2 h-1/2 bg-lime-500">Mint NFT</button> */}

        </div>
    );
}

export default MainPage;
