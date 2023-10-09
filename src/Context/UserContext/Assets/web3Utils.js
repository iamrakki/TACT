import Web3 from 'web3';
import MyNFTABI from './MyNFTABI.json';

const initializeWeb3 = async () => {
  try {
    const provider = new Web3.providers.HttpProvider('https://polygon-mumbai.infura.io/v3/467cb109e77349eeb28914213aab1e0a');
    const web3 = new Web3(provider);
    const contractAddress = '0x4925433146ede149231C7800c4E633c72d6Bc41A';
    const deployedContract = new web3.eth.Contract(MyNFTABI, contractAddress);
    return deployedContract;
  } catch (error) {
    console.error('Error initializing Web3:', error);
    return null;
  }
};

export default initializeWeb3;
