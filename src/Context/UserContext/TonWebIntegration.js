import React, { useEffect } from "react";
import TonWeb from "tonweb";

function BlockchainAuthProvider() {
  useEffect(() => {
    const $ = (selector) => document.querySelector(selector);

    // BLOCKCHAIN

    const { NftCollection, NftItem } = TonWeb.token.nft;

    const tonweb = new TonWeb(
      new TonWeb.HttpProvider("https://testnet.toncenter.com/api/v2/jsonRPC", {
        apiKey:
          "840d28de69582aa64848c262cd4633e9736ebc73b7c3cb79c75af1b944368192"
      })
    );

    const init = async () => {
      if (!window.tonProtocolVersion || window.tonProtocolVersion < 1) {
        alert("Please update your TON Wallet Extension");
        return;
      }

      const provider = window.ton;

      const accounts = await provider.send("ton_requestWallets");
      const walletAddress = new TonWeb.utils.Address(accounts[0].address);
      console.log("wallet address=", walletAddress.toString(true, true, true));

      const nftCollection = new NftCollection(tonweb.provider, {
        ownerAddress: walletAddress,
        royalty: 0.05,
        royaltyAddress: walletAddress,
        collectionContentUri:
          "https://gateway.pinata.cloud/ipfs/Qmed1iwGzx2XavERBPjGkUG9dZpJJqY5TKbfcz9TUrgM6F/0.json",
        nftItemContentBaseUri: "https://gold-exact-termite-826.mypinata.cloud/",
        nftItemCodeHex: NftItem.codeHex
      });
      const nftCollectionAddress = await nftCollection.getAddress();
      console.log(
        "collection address=",
        nftCollectionAddress.toString(true, true, true)
      );

      let itemIndex = 0;

      const deployNftCollection = async () => {
        const amount = TonWeb.utils.toNano("0.05");

        // Create the NFT collection state initialization data
        const stateInit = await nftCollection.createStateInit();

        // Convert the state initialization data to BOC and base64
        const stateInitBoc = await stateInit.stateInit.toBoc(false);
        const stateInitBase64 = TonWeb.utils.bytesToBase64(stateInitBoc);

        // Deploy the NFT collection
        await provider.send("ton_sendTransaction", [
          {
            to: nftCollectionAddress.toString(true, true, true),
            value: amount.toString(),
            stateInit: stateInitBase64,
            dataType: "boc"
          }
        ]);

        // Mint all items in the collection
        await mintAllNftItems(nftCollection, walletAddress);
      };

      const mintAllNftItems = async (collection, ownerAddress) => {
        // Fetch the list of files in nftItemContentBaseUri
        const contentUriBase = collection.nftItemContentBaseUri;
        const fileNames = await fetch(contentUriBase).then((response) =>
          response.json()
        );

        // Mint each file as an NFT
        for (const fileName of fileNames) {
          const contentUri = `${contentUriBase}${fileName}`;
          await mintNftItem(collection, ownerAddress, contentUri);
        }
      };

      const mintNftItem = async (collection, ownerAddress, contentUri) => {
        const amount = TonWeb.utils.toNano("0.05");

        const body = await collection.createMintBody({
          amount: amount,
          itemIndex: itemIndex,
          itemOwnerAddress: ownerAddress,
          itemContentUri: contentUri
        });
        const bodyBoc = await body.toBoc(false);
        const bodyBase64 = TonWeb.utils.bytesToBase64(bodyBoc);

        provider.send("ton_sendTransaction", [
          {
            to: nftCollectionAddress.toString(true, true, true),
            value: amount.toString(),
            data: bodyBase64,
            dataType: "boc"
          }
        ]);

        itemIndex++;
      };

      const getInfo = async () => {
        const data = await nftCollection.getCollectionData();
        data.ownerAddress = data.ownerAddress.toString(true, true, true);
        console.log(data);
        const nftItemAddress0 = (
          await nftCollection.getNftItemAddressByIndex(0)
        ).toString(true, true, true);
        console.log(nftItemAddress0);

        const nftItem = new NftItem(tonweb.provider, {
          address: nftItemAddress0
        });
        const nftData = await nftCollection.methods.getNftItemContent(nftItem);
        nftData.collectionAddress = nftData.collectionAddress.toString(
          true,
          true,
          true
        );
        nftData.ownerAddress = nftData.ownerAddress?.toString(true, true, true);
        console.log(nftData);
      };

      // BUTTONS

      $("#createCollectionButton").addEventListener("click", async () => {
        await deployNftCollection();
      });

      $("#createNftButton").addEventListener("click", async () => {
        const contentUri = $("#contentUriInput").value;
        await mintNftItem(nftCollection, walletAddress, contentUri);
      });

      try {
        getInfo();
      } catch (e) {
        console.error(e);
      }
    };

    if (window.ton) {
      init();
    } else {
      window.addEventListener("tonready", () => init(), false);
    }
  }, []);

  return (
    <div>
      <h1>TON Wallet</h1>
      <button id="createCollectionButton">Create Collection</button>

      {/* Add an input field for the content URI */}
      <input type="text" id="contentUriInput" placeholder="Enter Content URI" />
      <button id="createNftButton">Create NFT</button>
    </div>
  );
}

export default BlockchainAuthProvider;
