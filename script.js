let currentPricePerUnit = 0;

// Fungsi saat tombol "Order Sekarang" di kartu game diklik
function selectGame(gameName, price) {
    document.getElementById('gameSelect').value = gameName;
    currentPricePerUnit = price;
    document.getElementById('qty').value = 1; // reset jumlah ke 1
    calculateTotal();
    
    // Scroll otomatis ke form pemesanan
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
}

// Fungsi untuk menghitung total harga secara real-time
function calculateTotal() {
    const qty = document.getElementById('qty').value;
    const total = currentPricePerUnit * qty;
    
    // Format mata uang Rupiah
    document.getElementById('totalPrice').innerText = 'Rp ' + total.toLocaleString('id-ID');
}

// Fungsi kirim data pesanan ke WhatsApp
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nomorWhatsApp = "6281234567890"; // GANTI DENGAN NOMOR WHATSAPP-MU (Gunakan kode negara, misal 62)
    
    const game = document.getElementById('gameSelect').value;
    const idGame = document.getElementById('userId').value;
    const jumlah = document.getElementById('qty').value;
    const totalHarga = document.getElementById('totalPrice').innerText;
    
    if(!game) {
        alert('Silakan pilih game terlebih dahulu!');
        return;
    }
    
    // Struktur teks pesan WhatsApp
    const pesan = `Halo Admin JokiGaming, saya mau order joki:%0A%0A` +
                  `🎮 *Game:* ${game}%0A` +
                  `🆔 *ID & Server:* ${idGame}%0A` +
                  `🔢 *Jumlah:* ${jumlah}%0A` +
                  `💰 *Total Harga:* ${totalHarga}%0A%0A` +
                  `Mohon segera diproses ya!`;
                  
    // Membuka tab baru menuju WhatsApp
    window.open(`https://api.whatsapp.com/send?phone=${085363615993}&text=${pesan}`, '_blank');
});