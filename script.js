// Inisialisasi Thirdweb SDK dengan RPC URL atau ID project dari Thirdweb
const sdk = new thirdweb.ThirdwebSDK("https://8453.rpc.thirdweb.com/${fxA17lx9g0Fm_aU5Yq0yjxmgfIsskYDd9TLvnqqsa80BYXvyCYoLIeRbjJygMyhZBiw91oIwTlpjwB__8EbIuA}");

// Konfigurasi alamat kontrak
const contractAddress = "0xC09CbdD6a6e9381Fb73581b0ee5A536f0fEBb13c"; 
let walletAddress = "0x71Cf44C21562db79a4C84E75c597448066eb45D6";

// Tombol dan elemen HTML
const connectButton = document.getElementById("connectButton");
const mintButton = document.getElementById("mintButton");
const walletAddressSpan = document.getElementById("walletAddress");
const messageDiv = document.getElementById("message");
const walletInfo = document.getElementById("walletInfo");

// Fungsi untuk menghubungkan wallet
connectButton.onclick = async () => {
  try {
    const wallet = await sdk.wallet.connect(); // Mendukung MetaMask, Trust Wallet, dll.
    walletAddress = wallet.address;
    walletAddressSpan.textContent = walletAddress;
    walletInfo.classList.remove("hidden");
    mintButton.classList.remove("hidden");
  } catch (error) {
    console.error("Gagal menghubungkan wallet:", error);
  }
};

// Fungsi untuk mint NFT
mintButton.onclick = async () => {
  try {
    const contract = await sdk.getContract(contractAddress); // Ambil kontrak
    const tx = await contract.call("mint", [], { value: "10000000000000000" }); // 0.01 ETH
    await tx.wait();
    messageDiv.textContent = "NFT berhasil di-mint!";
    messageDiv.classList.remove("hidden");
    mintButton.classList.add("hidden");
  } catch (error) {
    console.error("Minting gagal:", error);
    messageDiv.textContent = "Minting gagal. Silakan coba lagi.";
    messageDiv.classList.remove("hidden");
  }
};
