import * as anchor from '@project-serum/anchor'
import { useEffect, useMemo, useState } from 'react'
import { TODO_PROGRAM_PUBKEY } from '../constants'
import { IDL as profileIdl } from '../constants/idl'
import toast from 'react-hot-toast'
import { SystemProgram } from '@solana/web3.js'
import { utf8 } from '@project-serum/anchor/dist/cjs/utils/bytes'
import { findProgramAddressSync } from '@project-serum/anchor/dist/cjs/utils/pubkey'
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react'
import { authorFilter } from '../utils'
import { Metaplex, walletAdapterIdentity, bundlrStorage, toMetaplexFile, irysStorage, guestIdentity    } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import { set } from '@project-serum/anchor/dist/cjs/utils/features'

export function useUserProfile() {


    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()
    // const [metaplex, setMetaplex] = useState();
    // console.log("rulik:", publicKey)
    // console.log("rulik adress:", publicKey?.toBase58())
    // useEffect(() => {
    //     setMetaplex(
    //       Metaplex.make(connection).use(
    //         anchorWallet ? walletAdapterIdentity(anchorWallet) : guestIdentity()
    //       )
    //     );
    //   }, [connection, anchorWallet]);

    // const metaplex = useMemo(() => {
    //     const metaplexInstance = Metaplex.make(connection)
    //         .use(walletAdapterIdentity(anchorWallet))
    //         // .use(irysStorage({
    //         //     address: 'https://devnet.irys.xyz',
    //         //     providerUrl: "https://snowy-long-patron.solana-devnet.quiknode.pro/e5d3c3687d54b13383f560248b0c18783557098a/",
    //         //     timeout: 120000,
    //         // }));
    //     return metaplexInstance;
    // }, [connection, anchorWallet]);
    // console.log("rulik metaplex:", metaplex.operations)

    // metaplex.use(walletAdapterIdentity(wallet));
    // metaplex.use(bungl);
    // console.log("rulik metaplex:", metaplex)

    // const metaplex = useMemo(() => new Metaplex(connection), [connection]);
    // useEffect(() => {
    //     metaplex.use(walletAdapterIdentity(wallet));
    // }, [wallet, metaplex]);


    const [initialized, setInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(false)
    const [bio, setBio] = useState(false)
    const [profilePicture, setProfilePicture] = useState(false)
    const [requests, setRequests] = useState([])

    const [lastPost, setLastPost] = useState(0)
    const [lastComment, setLastComment] = useState(0)   
    const [userPosts, setUserPosts] = useState([])
    const [userComments, setUserComments] = useState([])

    const [sentRequests, setSentRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [allProfileAccounts, setAllProfileAccounts] = useState([])
    const [posts, setPosts] = useState([])

    const [comments, setComments] = useState([])
    
    const [transactionPending, setTransactionPending] = useState(false)

    const [allPostTest, setAllPostTest] = useState([])

    const [nfts, setNfts] = useState([]);

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])



    const fetchUserProfile = async () => {
        if (program && publicKey && !transactionPending) {
            try {
                setLoading(true);
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);
                const profileAccount = await program.account.userProfile.fetch(profilePda);
                // console.log("profileAccount: ",profileAccount)
                const allProfileAccounts = await program.account.userProfile.all();
                const allPost = await program.account.post.all();
                const allComment = await program.account.comment.all();
                // console.log("allComment: ",allComment)
                setAllProfileAccounts(allProfileAccounts);
                setPosts(allPost);
                // setAllPostTest(allPostTest);
                // // console.log("allPost: ",allPostTest)
                // setComments(allComment);
                // console.log("allcpmments: ",allComment)
                if (profileAccount) {
                    setInitialized(true);
                    setName(profileAccount.name);
                    setProfilePicture(profileAccount.profilePicture);
                    const pendingRequestsReceived = profileAccount.pendingRequestsReceived.map(pk => pk.toBase58());
                    setRequests(pendingRequestsReceived);
                    const pendingRequestsSent = profileAccount.pendingRequestsSent.map(pk => pk.toBase58());
                    setSentRequests(pendingRequestsSent);

                    setLastPost(profileAccount.lastPost);

                    const friends = profileAccount.friends.map(pk => pk.toBase58());
                    setFriends(friends);

                    await fetchUserPosts(publicKey); // Fetch posts after user profile is fetched
                } else {
                    setInitialized(false);
                }
            } catch (error) {
                console.log(error);
                setInitialized(false);
            } finally {
                setLoading(false);
            }
        }
    } // Adjust the delay as needed

    // useEffect(() => {
    //     fetchUserProfile();
        
    // }, [publicKey, program, transactionPending]);
    useEffect(() => {
        const delayFetch = setTimeout(() => {
            fetchUserProfile();
        }, 1000); // 1000 ms delay (1 second)
    
        return () => clearTimeout(delayFetch); // Cleanup timeout on component unmount or dependency change
    }, [publicKey, program, transactionPending]);
    // useEffect(() => {
    //     const findUserProfile = async () => {
    //         if (program && publicKey && !transactionPending) {
    //             try {
    //                 setLoading(true)
    //                 const [profilePda, _] = await findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
    //                 const profileAccount = await program.account.userProfile.fetch(profilePda)
    //                 const allProfileAccounts = await program.account.userProfile.all()
    //                 // console.log(allProfileAccounts)
    //                 // console.log(typeof allProfileAccounts)
    //                 setAllProfileAccounts(allProfileAccounts)
    //                 if (profileAccount) {
    //                     setInitialized(true)
    //                     setName(profileAccount.name)
    //                     setProfilePicture(profileAccount.profilePicture)
    //                     const pendingRequestsReceived = profileAccount.pendingRequestsReceived.map(pk => pk.toBase58());
    //                     setRequests(pendingRequestsReceived);
    //                     const pendingRequestsSent = profileAccount.pendingRequestsSent.map(pk => pk.toBase58());
    //                     setSentRequests(pendingRequestsSent);

    //                     setLastPost(profileAccount.lastPost)

    //                     const friends = profileAccount.friends.map(pk => pk.toBase58());
    //                     setFriends(friends);

    //                     await fetchUserPosts(publicKey); // Fetch posts after user profile is fetched
                        
    //                 } else {
    //                     setInitialized(false)
    //                 }
    //             } catch (error) {
    //                 console.log(error)
    //                 setInitialized(false)
    //             } finally {
    //                 setLoading(false)
    //             }
    //         }
    //     }

    //     fi                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
//ndUserProfile()
    // }, [publicKey, program, transactionPending])

    const initializeUser = async (username, profilePictureUrl) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)

                await program.rpc.initialize(username, profilePictureUrl, {
                    accounts: {
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                    signers: [],
                })
                setInitialized(true)
                toast.success('Successfully initialized user.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }
    
    const sendFriendRequest = async (friendProfile) => {
        // console.log(friendProfile)
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                await program.rpc.sendFriendRequest({
                    accounts: {
                        friendProfile: friendProfile,
                        authority: publicKey,
                        userProfile:profilePda,
                    },
                    signers: [],
                })
                toast.success('Successfully sent friend request.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const acceptFriendRequest = async (senderProfile) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                await program.rpc.acceptFriendRequest({
                    accounts: {
                        senderProfile: senderProfile,
                        userProfile:profilePda,
                        authority: publicKey,
                        
                    },
                    signers: [],
                })
                toast.success('Successfully accepted friend request.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const rejectFriendRequest = async (senderProfile) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                await program.rpc.rejectFriendRequest({
                    accounts: {
                        authority: publicKey,
                        userProfile:profilePda,
                        senderProfile: senderProfile,
                    },
                    signers: [],
                })
                toast.success('Successfully rejected friend request.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const removeFriend = async (friendProfile) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                await program.rpc.removeFriend({
                    accounts: {
                        authority: publicKey,
                        userProfile:profilePda,
                        deleteWho: friendProfile,
                        
                    },
                    signers: [],
                })
                toast.success('Successfully removed friend.')
            } catch (error) {
                console.log(error)
                toast.error(error.toString())
            } finally {
                setTransactionPending(false)
            }
        }
    }

    const addPost = async (content, image, createdAt) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
    
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                const [postPda, postBump] = findProgramAddressSync([utf8.encode('POST_STATE'), publicKey.toBuffer(), Uint8Array.from([lastPost])],program.programId);
    
                await program.rpc.createPost(content, image, createdAt, {
                    accounts: {
                        userProfile: profilePda,
                        post: postPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                    signers: [],
                });
    
                toast.success('Successfully added post.');
            } catch (error) {
                console.error(error);
                toast.error(error.toString());
            } finally {
                setTransactionPending(false);
            }
        }
    };

    const addComment = async (content, createdAt, postPublicKey) => {
        // console.log("postPublicKey: ",postPublicKey)
        const postAccount = await program.account.post.fetch(postPublicKey);

        setLastComment(postAccount.lastComment);
        if (program && publicKey) {
            try {
                setTransactionPending(true);
    
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                console.log("profilePda: ",profilePda)
                // const [postPda, postBump] = findProgramAddressSync([utf8.encode('POST_STATE'), publicKey.toBuffer(), Uint8Array.from([lastPost])], program.programId);
               
                const postAccount = await program.account.post.fetch(postPublicKey);
                const currentLastComment = postAccount.lastComment; // 
                const [commentPda, commentBump] = findProgramAddressSync([utf8.encode('COMMENT_STATE'), publicKey.toBuffer(), postPublicKey.toBuffer(), Uint8Array.from([currentLastComment])],program.programId);
                console.log("commentPda: ",commentPda)
                await program.rpc.writeComment(content, createdAt, {
                    accounts: {
                        userProfile: profilePda,
                        post: postPublicKey,
                        comment: commentPda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    },
                    signers: [],
                });
    
                toast.success('Successfully added post.');
            } catch (error) {
                console.error(error);
                toast.error(error.toString());
            } finally {
                setTransactionPending(false);
            }
        }
    }

    const likePost = async (postPublicKey, like) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
    
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                console.log("profilePda: ",profilePda)  
                await program.rpc.likePost(like, {
                    accounts: {
                        userProfile: profilePda,
                        post: postPublicKey,
                        authority: publicKey,
                        
                    },
                    signers: [],
                });
    
                toast.success('Successfully liked post.');
            } catch (error) {
                console.error(error);
                toast.error(error.toString());
            } finally {
                setTransactionPending(false);
            }
        }
    }

    const deleteLike = async (postPublicKey, like) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true);
    
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                console.log("profilePda: ",profilePda)  
                await program.rpc.deleteLike(like, {
                    accounts: {
                        userProfile: profilePda,
                        post: postPublicKey,
                        authority: publicKey, 
                    },
                    signers: [],
                });
    
                toast.success('Successfully deleted like.');
            } catch (error) {
                console.error(error);
                toast.error(error.toString());
            } finally {
                setTransactionPending(false);
            }
        }
    }

    // Combine post array and user array to create a new array containing post info and user info
    const combinedPosts = posts.map(post => {
        const authorInfo = allProfileAccounts.find(profile => profile.account.authority.toBase58() === post.account.authority.toBase58());
        // console.log("authorInfo: ", allProfileAccounts)
        // console.log("postInfo: ", post)

        return {
            postInfo: post,
            userInfo: authorInfo
        };
    });

    console.log("combinedPosts: ",combinedPosts)

    const fetchUserPosts = async (userPublicKey) => {
        if (program) {
            try {
                setLoading(true);
                const postAccounts = await program.account.post.all([authorFilter(userPublicKey)]);
                // console.log("postAccounts: ",postAccounts)
                setUserPosts(postAccounts.map(account => account.account));
                // console.log(posts)
            } catch (error) {
                console.error('Failed to fetch posts:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const fetchPostComments = async (postPublicKey) => {
        if (program) {
            try {
                setLoading(true);
                const commentAccounts = await program.account.comment.all();
                const commentAccounts2 = commentAccounts.filter(comment => comment.account.post.toBase58() === postPublicKey.toBase58());
                console.log("commentAccounts: ",commentAccounts2)
                setUserComments(commentAccounts2.map(account => account.account));
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            } finally {
                setLoading(false);
            }
        }
    }


    const getUser = async (publicKey) => {
        
        publicKey = new PublicKey(publicKey)
        console.log("publicKey: ",publicKey)
        if (program) {
            try {
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId);
                const profileAccount = await program.account.userProfile.fetch(profilePda);
                console.log("profileAccount: ",profileAccount.name)
                return profileAccount;
            } catch (error) {
                console.error('Failed to fetch user:', error);
                throw error;
            }
        }
    }
    
    return { initialized, initializeUser,comments, combinedPosts, userComments,
        addComment, loading, addPost, transactionPending, fetchPostComments,
        sendFriendRequest,acceptFriendRequest, removeFriend, likePost,
        rejectFriendRequest, friends, name, requests, sentRequests, deleteLike,
        allProfileAccounts, profilePicture, userPosts, posts,
        getUser }
}
