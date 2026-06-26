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
    
    // PERBAIKAN: Nomor WhatsApp dimasukkan sebagai string dengan kode negara 62
    const nomorWhatsApp = "6285363615993"; 
    
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
                  
    // Membuka tab baru menuju WhatsApp menggunakan variabel nomorWhatsApp yang benar
    window.open(`https://api.whatsapp.com/send?phone=${6285363615993}&text=${pesan}`, '_blank');
});

// ==========================================
// TAMBAHAN: LOGIKA SLIDER BERITA & PROMO
// ==========================================
let currentSlideIndex = 0;

function moveSlide(direction) {
    const track = document.getElementById('sliderTrack');
    const slides = document.getElementsByClassName('news-card');
    const totalSlides = slides.length;

    // Hitung index baru berdasarkan arah panah (-1 atau 1)
    currentSlideIndex += direction;

    // Kalau pencet kanan di akhir slide, balik ke awal
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }
    
    // Kalau pencet kiri di awal slide, lompat ke slide paling akhir
    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }

    // Geser track memakai CSS transform secara real-time
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

// Mengantisipasi ukuran layar berubah agar pergeseran slider tetap presisi
window.addEventListener('resize', () => {
    const track = document.getElementById('sliderTrack');
    const slides = document.getElementsByClassName('news-card');
    if(slides.length > 0) {
        const slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
    }
});