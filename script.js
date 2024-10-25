// Konfigurasi provider untuk Base Network
const baseNetwork = {
  chainId: "0x1e", // Ganti dengan chainId Base Network
  chainName: "Base Network",
  rpcUrls: ["https://base-rpc-url.com"], // Ganti dengan RPC URL Base Network
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18
  },
  blockExplorerUrls: ["https://basescan.org"], // Ganti dengan explorer URL
};

// Konfigurasi provider dan kontrak
const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "ALAMAT_KONTRAK_ANDA"; // Ganti dengan alamat kontrak Anda
const contractABI = [
  // Ganti dengan ABI kontrak Anda
  "function mint() external payable",
  "event Minted(address indexed to, uint256 tokenId)",
];

document.getElementById("connectButton").onclick = connectWallet;
document.getElementById("mintButton").onclick = mintNFT;

async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Cek dan ubah jaringan jika perlu
            const { chainId } = await provider.getNetwork();
            if (chainId !== parseInt(baseNetwork.chainId, 16)) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [baseNetwork],
                });
            }
            
            const accounts = await provider.send("eth_requestAccounts", []);
            const walletAddress = accounts[0];
            document.getElementById("walletAddress").textContent = walletAddress;
            document.getElementById("walletInfo").classList.remove("hidden");
            document.getElementById("mintButton").classList.remove("hidden");
        } catch (error) {
            console.error("Connection failed: ", error);
        }
    } else {
        alert("Please install MetaMask!");
    }
}

async function mintNFT() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    try {
        const tx = await contract.mint({ value: ethers.utils.parseEther("0.01") }); // Kirim ETH untuk mint
        await tx.wait(); // Tunggu transaksi selesai
        console.log("NFT Minted!");
        document.getElementById("message").textContent = "NFT Minted Successfully!";
        document.getElementById("message").classList.remove("hidden");
        document.getElementById("mintButton").classList.add("hidden"); // Sembunyikan tombol mint
        document.getElementById("soldOutButton").classList.remove("hidden"); // Tampilkan tombol sold out
    } catch (error) {
        console.error("Minting failed: ", error);
        document.getElementById("message").textContent = "Minting failed. Please try again.";
        document.getElementById("message").classList.remove("hidden");
    }
}
