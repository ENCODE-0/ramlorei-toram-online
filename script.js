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
    
    // 1. PASTIKAN NOMOR DI SINI SUDAH BENAR (Gunakan string/tanda kutip)
    const nomorWhatsApp = "6285363615993"; 
    
    const game = document.getElementById('gameSelect').value;
    const ign = document.getElementById('ign').value;
    const jumlah = document.getElementById('qty').value;
    const totalHarga = document.getElementById('totalPrice').innerText;
    
    if(!game) {
        alert('Silakan pilih game terlebih dahulu!');
        return;
    }
    
    // 2. Gunakan format teks biasa, biarkan JavaScript yang melakukan encoding nanti
    const teksPesan = `Halo Admin JokiGaming, saya mau order joki:\n\n` +
                      `🎮 *Game:* ${game}\n` +
                      `🆔 *IN GAME NAME:* ${ign}\n` +
                      `🔢 *Jumlah:* ${jumlah}\n` +
                      `💰 *Total Harga:* ${totalHarga}\n\n` +
                      `Mohon segera diproses ya!`;
                      
    // 3. Gunakan encodeURIComponent agar URL terbentuk dengan sempurna
    const pesanSempurna = encodeURIComponent(teksPesan);
                  
    // 4. Panggil variabel nomorWhatsApp yang sudah dibuat di atas
    window.open(`https://api.whatsapp.com/send?phone=${nomorWhatsApp}&text=${pesanSempurna}`, '_blank');
});