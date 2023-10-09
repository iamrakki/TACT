import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import CryptoJS from 'crypto-js';
import { ethers } from "ethers";
import { Web3 } from "web3";
import initializeWeb3 from "./Assets/web3Utils";
import TonWeb from "tonweb"; 

export const BlockchainAuthContext = createContext();

const BlockchainAuthProvider = ({ children }) => {
    const [contract, setContract] = useState(null);
    //const privateKey = '0xaae6757d640c565936fef7fb0aa53e9be9e397428406a35ec0008401d7a70c8d';

    useEffect(() => {
        const initWeb3 = async () => {
            const deployedContract = await initializeWeb3();
            setContract(() => deployedContract);
        };
        initWeb3();
    }, []);

    const uploadToIPFS = async (imageUrl) => {
        try {
            const responses = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            const imageBlob = new Blob([responses.data], { type: 'image/jpeg' });

            // Convert Blob to a File object
            const file = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });

            const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    pinata_api_key: 'ddaa653a0a2e4905e244',
                    pinata_secret_api_key: '0a118681691f75b732e420652e7497baebc1d1184433ac85eeb7c9af2cbd7d95',
                },
            });

            return response.data.IpfsHash;
        } catch (error) {
            console.error('Error uploading to IPFS:', error);
            throw error;
        }
    };

    const uploadFilesToIPFS = async (selectedFiles) => {
        const ipfsHashes = [];
        for (const file of selectedFiles) {
            try {
                   // const data = new FormData();
                // data.append("image", file);
                // await axios.post("https://api.zecurechain.com/api/v1/certificate/convert-image", data, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     }
                // })
                //     .then(async res => {
                //         if (res.status == 200) {
                //             const responses = await axios.get(res.data?.data, { responseType: 'arraybuffer' }, {
                //                 headers: {
                //                     "Content-Type": "text/html",
                //                 }
                //             });
                //             const imageBlob = new Blob([responses.data], { type: 'image/jpeg' });

                //             // Convert Blob to a File object
                //             const file = new File([imageBlob], 'image.jpg', { type: 'image/jpeg' });

                //             console.log(file);
                //             const formData = new FormData();
                //             formData.append('file', file);

                //             const options = {
                //                 headers: {
                //                     pinata_api_key: 'ddaa653a0a2e4905e244',
                //                     pinata_secret_api_key: '0a118681691f75b732e420652e7497baebc1d1184433ac85eeb7c9af2cbd7d95',
                //                 },
                //             };

                //             const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, options);
                //             ipfsHashes.push(response.data.IpfsHash);
                //         }

                //     })
                //     .catch((e) => {
                //         console.error('Error uploading file to IPFS:', e);
                //         return null;
                //     })
                const formData = new FormData();
                formData.append('file', file);

                const options = {
                    headers: {
                        pinata_api_key: 'ddaa653a0a2e4905e244',
                        pinata_secret_api_key: '0a118681691f75b732e420652e7497baebc1d1184433ac85eeb7c9af2cbd7d95',
                    },
                };

                const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, options);
                ipfsHashes.push(response.data.IpfsHash);
            } catch (error) {
                console.error('Error uploading file to IPFS:', error);
                return null;
            }
        }
        return ipfsHashes;
    };

    const createNFT = async (contentUri) => {
        
        try {
            const tonweb = new TonWeb(
                new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
                    apiKey: "840d28de69582aa64848c262cd4633e9736ebc73b7c3cb79c75af1b944368192"
                })
            );

          
            const { NftCollection, NftItem } = TonWeb.token.nft;
            const walletAddress = tonweb.wallet.address;

            const nftCollection = new NftCollection(tonweb.provider, {
                ownerAddress: walletAddress,
                royalty: 0.05,
                royaltyAddress: walletAddress,
                collectionContentUri: contentUri,
                nftItemContentBaseUri: "https://gold-exact-termite-826.mypinata.cloud/",
                nftItemCodeHex: NftItem.codeHex
            });

            const nftCollectionAddress = await nftCollection.getAddress();

          
            await deployNftCollection(nftCollection, walletAddress);

            const nftItem = await mintNftItem(nftCollection, walletAddress, contentUri);

            return {
                nftCollectionAddress: nftCollectionAddress.toString(true, true, true),
                nftItemAddress: nftItem.address.toString(true, true, true)
            };
        } catch (error) {
            console.error("Error creating NFT:", error);
            throw error;
        }
    };

    const deployNftCollection = async (collection, ownerAddress) => {
    
        const amount = TonWeb.utils.toNano("0.05");

        const stateInit = await collection.createStateInit();
        const stateInitBoc = await stateInit.stateInit.toBoc(false);
        const stateInitBase64 = TonWeb.utils.bytesToBase64(stateInitBoc);

        await collection.provider.send("ton_sendTransaction", [
            {
                to: collection.address.toString(true, true, true),
                value: amount.toString(),
                stateInit: stateInitBase64,
                dataType: "boc"
            }
        ]);
    };

    const mintNftItem = async (collection, ownerAddress, contentUri) => {
        
        const amount = TonWeb.utils.toNano("0.05");

        const body = await collection.createMintBody({
            amount: amount,
            itemIndex: 0, 
            itemOwnerAddress: ownerAddress,
            itemContentUri: contentUri
        });

        const bodyBoc = await body.toBoc(false);
        const bodyBase64 = TonWeb.utils.bytesToBase64(bodyBoc);

        await collection.provider.send("ton_sendTransaction", [
            {
                to: collection.address.toString(true, true, true),
                value: amount.toString(),
                data: bodyBase64,
                dataType: "boc"
            }
        ]);

        return collection.getNftItemByIndex(0); 
    };

    return (
        <BlockchainAuthContext.Provider
            value={{
                uploadToIPFS,
                createNFT,
                contract,
                //privateKey
            }}
        >
            {children}
        </BlockchainAuthContext.Provider>
    );
};

export default BlockchainAuthProvider;
