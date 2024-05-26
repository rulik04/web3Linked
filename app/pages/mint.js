import { useState } from 'react';
import { useUserProfile } from '../hooks/todo';

const MintNFT = () => {
    const { uploadMeta, createNft } = useUserProfile();


    const mintNFT = () => {
        const uriMake = uploadMeta();
        const nft =  createNft(uriMake);
        console.log("finish:", nft);
    }


    return (
        <div>
            <button onClick={mintNFT} className="w-1/2 h-1/2 bg-lime-500">Mint NFT</button>
        </div>
    );
};

export default MintNFT;
