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
import { set } from '@project-serum/anchor/dist/cjs/utils/features'

export function useUserProfile() {
    const { connection } = useConnection()
    const { publicKey } = useWallet()
    const anchorWallet = useAnchorWallet()

    const [initialized, setInitialized] = useState(false)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(false)
    const [requests, setRequests] = useState([])
    const [sentRequests, setSentRequests] = useState([])
    const [friends, setFriends] = useState([])
    const [allProfileAccounts, setAllProfileAccounts] = useState([])
    const [transactionPending, setTransactionPending] = useState(false)

    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions())
            return new anchor.Program(profileIdl, TODO_PROGRAM_PUBKEY, provider)
        }
    }, [connection, anchorWallet])

    useEffect(() => {
        const findUserProfile = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    setLoading(true)
                    const [profilePda, _] = await findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                    const profileAccount = await program.account.userProfile.fetch(profilePda)
                    const allProfileAccounts = await program.account.userProfile.all()
                    console.log(allProfileAccounts)
                    console.log(typeof allProfileAccounts)
                    setAllProfileAccounts(allProfileAccounts)
                    if (profileAccount) {
                        setInitialized(true)
                        setName(profileAccount.name)
                        const pendingRequestsReceived = profileAccount.pendingRequestsReceived.map(pk => pk.toBase58());
                        setRequests(pendingRequestsReceived);
                        const pendingRequestsSent = profileAccount.pendingRequestsSent.map(pk => pk.toBase58());
                        setSentRequests(pendingRequestsSent);

                        const friends = profileAccount.friends.map(pk => pk.toBase58());
                        setFriends(friends);
                        
                    } else {
                        setInitialized(false)
                    }
                } catch (error) {
                    console.log(error)
                    setInitialized(false)
                } finally {
                    setLoading(false)
                }
            }
        }

        findUserProfile()
    }, [publicKey, program, transactionPending])

    const initializeUser = async (username) => {
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)

                await program.rpc.initialize(username, {
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
        if (program && publicKey) {
            try {
                setTransactionPending(true)
                const [profilePda, _] = findProgramAddressSync([utf8.encode('USER_STATE'), publicKey.toBuffer()], program.programId)
                await program.rpc.sendFriendRequest({
                    accounts: {
                        friendProfile: friendProfile,
                        senderAuthority: publicKey,
                        senderProfile:profilePda,
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

    return { initialized, initializeUser, loading, transactionPending, sendFriendRequest,acceptFriendRequest, removeFriend, rejectFriendRequest, friends, name, requests, sentRequests, allProfileAccounts}
}
