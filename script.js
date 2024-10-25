// Konfigurasi provider untuk Base Network
const baseNetwork = {
  chainId: "0x1e", // Chain ID Base Network
  chainName: "Base Network",
  rpcUrls: ["https://base-rpc-url.com"], // Ganti dengan RPC URL Base Network
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: ["https://basescan.org"],
};

const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "ALAMAT_KONTRAK_ANDA"; // Ganti dengan alamat kontrak Anda
const contractABI = [
  "function mint() external payable",
  "event Minted(address indexed to, uint256 tokenId)",
];

// Tombol dan elemen HTML
const connectButton = document.getElementById("connectButton");
const mintButton = document.getElementById("mintButton");
const walletInfo = document.getElementById("walletInfo");
const walletAddressSpan = document.getElementById("walletAddress");
const messageDiv = document.getElementById("message");

connectButton.onclick = connectWallet;
mintButton.onclick = mintNFT;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await checkNetwork(); // Cek dan ubah jaringan jika perlu
      const accounts = await provider.send("eth_requestAccounts", []);
      walletAddressSpan.textContent = accounts[0];
      walletInfo.classList.remove("hidden");
      mintButton.classList.remove("hidden");
    } catch (error) {
      console.error("Connection failed: ", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}

async function checkNetwork() {
  const { chainId } = await provider.getNetwork();
  if (chainId !== parseInt(baseNetwork.chainId, 16)) {
    alert(`Please switch to ${baseNetwork.chainName}`);
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [baseNetwork],
    });
  }
}

async function mintNFT() {
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  try {
    const tx = await contract.mint({ value: ethers.utils.parseEther("0.01") });
    await tx.wait();
    messageDiv.textContent = "NFT Minted Successfully!";
    messageDiv.classList.remove("hidden");
    mintButton.classList.add("hidden");
  } catch (error) {
    console.error("Minting failed: ", error);
    messageDiv.textContent = "Minting failed. Please try again.";
    messageDiv.classList.remove("hidden");
  }
}
