// import React from 'react';
// import { useState, useEffect } from 'react';
// import { useUserProfile } from '../../hooks/todo';
// import { useConnection } from '@solana/wallet-adapter-react';
// import { useWallet } from '@solana/wallet-adapter-react';
// import { useAnchorWallet } from '@solana/wallet-adapter-react';
// import { TODO_PROGRAM_PUBKEY } from '../../constants'
// import { IDL as profileIdl } from '../../constants/idl'
// import { useMemo } from 'react';
// import * as anchor from '@project-serum/anchor'



// const Post = ({ profileName, profilePicture, content, postImage, createdTime, profileAuthority, postPublicKey }) => {
//   const { addComment, comments, allProfileAccounts, likePost} = useUserProfile();

//   const { connection } = useConnection()
//   const { publicKey } = useWallet()
//   const anchorWallet = useAnchorWallet()
//   const [loading, setLoading] = useState(false)

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
//     const date = new Date(dateString);
//     return date.toLocaleDateString(undefined, options);
//   };


  
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState('');
//   const [postComments, setPostComments] = useState([]);
//   const [userComments, setUserComments] = useState([])

//   const program = useMemo(() => {
//     if (anchorWallet) {
//         const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
//         return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider)
//     }
// }, [connection, anchorWallet])

//   formatDate(createdTime)
//   const toggleComments = async () => {
//     setShowComments(!showComments);
//     if(!showComments){
//      await fetchPostComments(postPublicKey)
//       // console.log("ex cpomments", userComments)
//       // setPostComments(comments.map((comment) => comment.account.authority === profileAuthority)) 
//       // console.log(postComments)
//       console.log(comments)
//     }
//   };
// //   console.log("userComments", userComments)
// //   console.log("allProfileAccounts", allProfileAccounts)

//   const fetchPostComments = async (postPublicKey) => {
//     if (program) {
//         try {
//             setLoading(true);
//             const commentAccounts = await program.account.comment.all();
//             const commentAccounts2 = commentAccounts.filter(comment => comment.account.post.toBase58() === postPublicKey.toBase58());
//             console.log("commentAccounts: ", commentAccounts2)
//             setUserComments(commentAccounts2.map(account => account.account));
//         } catch (error) {
//             console.error('Failed to fetch comments:', error);
//         } finally {
//             setLoading(false);
//         }
//     }
// }
//     // const getCommentAuthor = async (authority) => {
//     //     if (program) {
//     //         try {
//     //             setLoading(true);
//     //             const account = allProfileAccounts
//     //             return account.account.name;
//     //         } catch (error) {
//     //             console.error('Failed to fetch comments:', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     }
//     // }
        

//     const togglelikes = async () => {
//         likePost(postPublicKey, publicKey)
//     }

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = async() => {
//     addComment(newComment, new Date().toString(), postPublicKey);
//     setNewComment('');
//   };
// //   console.log("userComments", userComments)
//   const combinedComments = userComments.map((comment) => {
//     // console.log("comment", comment)
//     const authorInfo = allProfileAccounts.find((account) => account.account.authority.toBase58() === comment.authority.toBase58());


//     return {
//         commentInfo: comment,
//         userInfo: authorInfo
//     };
//     });

//     // console.log("combinedComments", combinedComments)
    
//   return (
//     <div className="flex justify-center mt-10">
//       <div className='bg-white p-4 shadow-md rounded-md mb-4 w-1/2 relative' >
//         {/* Post Header */}
//         <div className="flex items-center mb-4">
//           <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-2 object-cover"/>
//           <div>
//             <h2 className="font-semibold text-lg text-black">{profileName}</h2>
//             {/* You can include other profile details here */}
//             <p className='text-gray-500'>IT-recruiter at Ozon Tech</p>

//           </div>
//           <div className="text-gray-500 text-sm absolute top-4 right-4">{formatDate(createdTime)}</div>

//         </div>
//         {/* <hr /> */}
//         {/* Post Content */}
//         <p className="text-gray-800">
//           {content}
//         </p>
        
//         {/* Post Image (optional) */}
//         {postImage && (
//           <img
//             src={postImage}
//             alt="Post"
//             className="w-full mt-4 rounded-md"
//           />
//         )}
//         <hr className='my-3'/>
//         {/* Post Footer */}
//         <div className="flex gap-10  items-center w-1/2">
//           <button className="flex items-center" onClick={togglelikes}>
//             {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
//             </svg> */}
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
//             </svg>

//             <span className="text-gray-500 ml-1">46</span>
//           </button>

//           <button className="flex items-center" onClick={toggleComments}>
//             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
//               <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
//             </svg>
//             <span className="text-gray-500 ml-1">{comments}52</span>
//           </button>

//           <div className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
//           </svg>
//           </div>
//         </div>
        
//         {/* Created Time */}
//         {/* <div className="text-gray-500 text-sm mt-2">Created {createdTime}</div> */}

//                     {/* Comments Section */}
//         {showComments && (
//           <div className="mt-4 text-teal-800">
//             {/* Render your comments here */}
//             {combinedComments.map((comment, index) => (
//               <div key={index} className="bg-gray-100 p-2 rounded-md mt-2">
//                 <h3 className="font-semibold text-black">{comment.userInfo.account.name}</h3>
//                 <p className="text-sm">{comment.commentInfo.content}</p>
//                 <p className="text-xs text-gray-500">{formatDate(comment.commentInfo.createdAt)}</p>
//               </div>
//             ))  
//             }
//             {/* Add more comments as needed */}
//           </div>
//         )}

//         {/* Input field for new comment */}
//         <div className="mt-4">
//           <textarea
//             className="w-full border border-gray-300 rounded-md p-2 text-black"
//             placeholder="Write a comment..."
//             value={newComment}
//             onChange={handleCommentChange}
//           ></textarea>
//           <button
//             className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             onClick={handleCommentSubmit}
//           >
//             Post Comment
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Post;


import React, { useState, useEffect, useMemo } from 'react';
import { useUserProfile } from '../../hooks/todo';
import { useConnection, useWallet, useAnchorWallet } from '@solana/wallet-adapter-react';
import { TODO_PROGRAM_PUBKEY } from '../../constants';
import { IDL as profileIdl } from '../../constants/idl';
import * as anchor from '@project-serum/anchor';

const Post = ({ profileName, profilePicture, content, postImage, createdTime, profileAuthority, postPublicKey, likeCount }) => {
  const { addComment, comments, allProfileAccounts, likePost, deleteLike } = useUserProfile();
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [postComments, setPostComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [isLiked, setIsLiked] = useState(false); // state to track if the post is liked

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };


  const program = useMemo(() => {
    if (anchorWallet) {
      const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
      return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider);
    }
  }, [connection, anchorWallet]);

  const toggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      await fetchPostComments(postPublicKey);
      console.log(comments);
    }
  };

  useEffect(() => {
    if (likeCount.some((like) => like.toBase58() === publicKey.toBase58())) {
      setIsLiked(true);
    }
    }, [likeCount]);


  const fetchPostComments = async (postPublicKey) => {
    if (program) {
      try {
        setLoading(true);
        const commentAccounts = await program.account.comment.all();
        const commentAccounts2 = commentAccounts.filter(comment => comment.account.post.toBase58() === postPublicKey.toBase58());
        console.log("commentAccounts: ", commentAccounts2);
        setUserComments(commentAccounts2.map(account => account.account));
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleLikes = async () => {
    if (isLiked) {
      deleteLike(postPublicKey, publicKey);
    } else {
      likePost(postPublicKey, publicKey);
    }
    setIsLiked(!isLiked);
  };
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    addComment(newComment, new Date().toString(), postPublicKey);
    setNewComment('');
  };

  const combinedComments = userComments.map((comment) => {
    const authorInfo = allProfileAccounts.find((account) => account.account.authority.toBase58() === comment.authority.toBase58());
    return {
      commentInfo: comment,
      userInfo: authorInfo,
    };
  });

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-4 shadow-md rounded-md mb-4 w-1/2 relative">
        <div className="flex items-center mb-4">
          <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-2 object-cover" />
          <div>
            <h2 className="font-semibold text-lg text-black">{profileName}</h2>
            <p className="text-gray-500">IT-recruiter at Ozon Tech</p>
          </div>
          <div className="text-gray-500 text-sm absolute top-4 right-4">{formatDate(createdTime)}</div>
        </div>
        <p className="text-gray-800">{content}</p>
        {postImage && (
          <img src={postImage} alt="Post" className="w-full mt-4 rounded-md" />
        )}
        <hr className="my-3" />
        <div className="flex gap-10 items-center w-1/2">
          <button
            className={`flex items-center ${isLiked ? 'text-red-500' : 'text-black'}`}
            onClick={toggleLikes}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
            <span className="text-gray-500 ml-1">{likeCount.length}</span>
          </button>

          <button className="flex items-center" onClick={toggleComments}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            <span className="text-gray-500 ml-1">{comments}52</span>
          </button>

          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </div>
        </div>

        {showComments && (
          <div className="mt-4 text-teal-800">
            {combinedComments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-2 rounded-md mt-2">
                <h3 className="font-semibold text-black">{comment.userInfo.account.name}</h3>
                <p className="text-sm">{comment.commentInfo.content}</p>
                <p className="text-xs text-gray-500">{formatDate(comment.commentInfo.createdAt)}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4">
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 text-black"
            placeholder="Write a comment..."
            value={newComment}
            onChange={handleCommentChange}
          ></textarea>
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
