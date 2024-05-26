import axios from 'axios';

const PINATA_API_KEY = '6fa127223a6f30e08956';
const PINATA_SECRET_API_KEY = 'a115a7ebe91df1766e17aea64e1dedde79c6700bf33574466d32d647c22bc425';
const PINATA_BASE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export const uploadToPinata = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post(PINATA_BASE_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'pinata_api_key': PINATA_API_KEY,
        'pinata_secret_api_key': PINATA_SECRET_API_KEY,
      },
    });

    return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
  } catch (error) {
    console.error('Error uploading file to IPFS: ', error);
    throw new Error('Unable to upload file to IPFS');
  }
};
