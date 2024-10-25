// Konfigurasi awal
const maxMint = 10000;
let currentMinted = 0; // Awal dari 0
let mintAmount = 1;

// Ambil elemen-elemen yang dibutuhkan
const amountDisplay = document.getElementById("amount");
const totalDisplay = document.getElementById("total");
const currentMintedDisplay = document.getElementById("currentMinted");
const mintButton = document.getElementById("mintButton");
const soldOutButton = document.getElementById("soldOutButton");

// Fungsi untuk memperbarui total harga
function updateTotal() {
  const pricePerNFT = 0.001; // Harga per NFT
  totalDisplay.textContent = (pricePerNFT * mintAmount).toFixed(3);
}

// Fungsi untuk menambah atau mengurangi jumlah mint
document.getElementById("increase").addEventListener("click", () => {
  if (mintAmount < 5) {
    mintAmount++;
    amountDisplay.textContent = mintAmount;
    updateTotal();
  }
});

document.getElementById("decrease").addEventListener("click", () => {
  if (mintAmount > 1) {
    mintAmount--;
    amountDisplay.textContent = mintAmount;
    updateTotal();
  }
});

// Fungsi untuk mint NFT
mintButton.addEventListener("click", () => {
  if (currentMinted + mintAmount <= maxMint) {
    currentMinted += mintAmount;
    currentMintedDisplay.textContent = currentMinted;

    // Periksa apakah minting sudah selesai
    if (currentMinted >= maxMint) {
      soldOutButton.disabled = false; // Aktifkan tombol SOLD OUT
      mintButton.disabled = true; // Nonaktifkan tombol mint
    }
  } else {
    alert("Minting limit reached!");
  }
});

import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { ethereum } from "thirdweb/chains";

const client = createThirdwebClient({
  clientId: "....",
});

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("io.rabby"),
  createWallet("io.zerion.wallet"),
  createWallet("com.okex.wallet"),
  createWallet("com.bitget.web3"),
  createWallet("com.binance"),
  createWallet("com.bybit"),
  createWallet("com.trustwallet.app"),
  createWallet("org.uniswap"),
  createWallet("com.ledger"),
  createWallet("pro.tokenpocket"),
  createWallet("com.safepal"),
];

function Example() {
  return (
    <ConnectButton
      client={client}
      wallets={wallets}
      theme={darkTheme({
        colors: { accentText: "#0000ff" },
      })}
      connectButton={{ label: "Connect Wallet" }}
      connectModal={{
        size: "compact",
        title: "Connect Wallet",
      }}
      accountAbstraction={{
        chain: ethereum, // replace with the chain you want
        sponsorGas: true,
      }}
      auth={{
        async doLogin(params) {
          // call your backend to verify the signed payload passed in params
        },
        async doLogout() {
          // call your backend to logout the user if needed
        },
        async getLoginPayload(params) {
          // call your backend and return the payload
        },
        async isLoggedIn() {
          // call your backend to check if the user is logged in
        },
      }}
    />
  );
}
