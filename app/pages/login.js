import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useUserProfile } from '../hooks/todo';
import ProfilePictureUpload from '../components/ProfilePictureUpload';
import { uploadToPinata } from '../utils/pinata';

const Home = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [profilePicture2, setProfilePicture2] = useState(null);
    const { initialized, initializeUser, loading, transactionPending } = useUserProfile();


    
    const handleInitializeUser = async () => {
        if (username.trim() === '') {
            alert('Please enter a username.');
            return;
        }

        let profilePictureUrl = 'https://gateway.pinata.cloud/ipfs/QmTQ8GmD5Qp1YwqCR37bsrqC5fwxGEJCfoRZQs2ANzL9an';
        if (profilePicture) {
            try {
                profilePictureUrl = await uploadToPinata(profilePicture);
                
            } catch (error) {
                console.error('Error uploading file to IPFS: ', error);
                alert('Error uploading profile picture. Please try again.');
                return;
            }
        }
        console.log('Profile picture uploaded to IPFS: ', profilePictureUrl);
        initializeUser(username.trim(), profilePictureUrl);
    };

    useEffect(() => {
        if (initialized) {
            router.push('/main');
        }
    }, [initialized, router]);

    const handleProfilePictureChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setProfilePicture(e.target.files[0]);
            setProfilePicture2(URL.createObjectURL(e.target.files[0]));
        }
    };

    return (
        <div className="flex justify-center items-center h-full w-full p-5">
            <div className="w-full max-w-md">
                <WalletMultiButton />
                <div className="mt-5">
                    <label className="text-lg font-bold mb-2 block">
                        Username <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        className="w-full h-10 p-3 border rounded-md border-slate-200 mb-4"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="text-lg font-bold mb-2 block">Profile Picture</label>
                    <input
                        type="file"
                        className="w-full p-3 border rounded-md border-slate-200 text-white"
                        onChange={handleProfilePictureChange}
                    />
                     {profilePicture && (
                            <img src={profilePicture2} alt="Profile Picture" className="mt-4 w-32 h-32 rounded-full object-cover" />
                        )}
                </div>
                <button
                    type="button"
                    className="bg-blue-500 text-white w-full h-10 rounded-md"
                    onClick={handleInitializeUser}
                >
                    Initialize User
                </button>
            </div>
        </div>
    );
};

export default Home;
