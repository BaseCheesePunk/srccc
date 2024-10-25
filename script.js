// Inisialisasi Thirdweb SDK dengan RPC URL atau ID project dari Thirdweb
const sdk = new thirdweb.ThirdwebSDK("https://embed.ipfscdn.io/ipfs/bafybeicd3qfzelz4su7ng6n523virdsgobrc5pcbarhwqv3dj3drh645pi/?contract=0xC09CbdD6a6e9381Fb73581b0ee5A536f0fEBb13c&chain=%7B%22name%22%3A%22Base%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F8453.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22base%22%2C%22chainId%22%3A8453%2C%22testnet%22%3Afalse%2C%22slug%22%3A%22base%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmaxRoHpxZd8PqccAynherrMznMufG6sdmHZLihkECXmZv%22%2C%22width%22%3A1200%2C%22height%22%3A1200%2C%22format%22%3A%22png%22%7D%7D&clientId=3f15e5aedbb55f0047ff8a7ad6a49ba3&theme=dark&primaryColor=purple");
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
