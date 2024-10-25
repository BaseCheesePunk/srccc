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
