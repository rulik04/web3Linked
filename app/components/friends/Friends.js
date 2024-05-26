import { useUserProfile } from '../../hooks/todo';
import { useEffect, useState } from 'react';

export default function Friends() {
    const { initialized, initializeUser, loading, removeFriend, transactionPending, sendFriendRequest, acceptFriendRequest, friends, name, requests, sentRequests, allProfileAccounts } = useUserProfile();
    const [allFriends, setAllFriends] = useState([]);

    useEffect(() => {
        const allFriends = allProfileAccounts.filter(item => friends.includes(item.publicKey.toString()));
        setAllFriends(allFriends);
    }, [allProfileAccounts, friends]);

    return (
        <div>
            <ul className='flex flex-col bg-gray-800 h-96 rounded-md p-2'>
                <p className='text-lg font-bold text-center'>Friends:</p>
                {allFriends.length === 0 ? (
                    <div className='flex justify-center items-center h-full'>
                        <p className='text-gray-300'>No friends</p>
                    </div>
                ) : (
                    allFriends.map((item, index) => (
                        <li key={index}>
                            <div className="my-3 flex gap-5 p-3 items-center">
                               
                                    {/* You can add an avatar or icon here */}
                                    <img
                                        src={item.account.profilePicture}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full"
                                    />
                                
                                <div className='flex flex-col justify-center gap-1'>
                                    <p className='font-bold'>{item.account.name}</p>
                                    <p className='text-gray-300'>IT-recruiter at Ozon Tech</p>
                                    {/* <p>{item.publicKey.toString()}</p> */}
                                </div>
                                <button className='bg-red-500 rounded-md p-2 ml-5' onClick={() => removeFriend(item.publicKey.toString())}>Remove Friend</button>
                            </div>
                            <hr className='border border-gray-500'/>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
