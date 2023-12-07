import React, { useState } from "react";
import { Keypair } from "@solana/web3.js";

function App() {
  const [keypair, setKeypair] = useState(null);

  const generateWallet = () => {
    const keypair = Keypair.generate();
    setKeypair(keypair);
  };

  let privateKeyHex = "";

  if (keypair) {
    const privateKeyUint8Array = new Uint8Array(keypair.secretKey);
    privateKeyHex = Buffer.from(privateKeyUint8Array).toString("hex");
  }

  return (
    <div className="App">
      <h1>Solana Wallet Generator</h1>
      {keypair ? (
        <div>
          <p>Address: {keypair.publicKey.toBase58()}</p>
          <p>Private Key: {privateKeyHex}</p>
        </div>
      ) : (
        <button onClick={generateWallet}>Generate Wallet</button>
      )}
    </div>
  );
}

export default App;
