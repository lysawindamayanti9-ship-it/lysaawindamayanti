// ==================================
// KERANJANG BELANJA
// ==================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    renderCart();
}

function updateCart() {
    let counts = document.querySelectorAll("#cart-count");

    let total = cart.reduce((sum, item) => sum + item.quantity, 0);

    counts.forEach(element => {
        element.textContent = total;
    });
}

function addToCart(name, price) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();

    alert(name + " berhasil ditambahkan ke keranjang! ♡");
}


// ==================================
// MENAMPILKAN KERANJANG
// ==================================

function renderCart() {

    let container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    if (cart.length === 0) {
        container.innerHTML = "<p>Keranjang kamu masih kosong 🍪</p>";
    }

    let total = 0;

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        let div = document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <p>Rp ${item.price.toLocaleString("id-ID")}</p>
            </div>

            <div>
                <button onclick="changeQuantity(${index},-1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index},1)">+</button>
                <button onclick="removeItem(${index})">🗑</button>
            </div>
        `;

        container.appendChild(div);
    });

    let totalElement = document.getElementById("cart-total");

    if (totalElement) {
        totalElement.textContent =
            "Total: Rp " + total.toLocaleString("id-ID");
    }
}


// ==================================
// TAMBAH DAN KURANGI JUMLAH
// ==================================

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
}


function showCart() {

    let section = document.getElementById("cart-section");

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


// ==================================
// BUY NOW
// ==================================

function buyNow(name, price) {

    cart = [{
        name: name,
        price: price,
        quantity: 1
    }];

    saveCart();

    showCart();

}


// ==================================
// CHECKOUT WHATSAPP
// ==================================

function checkout() {

    if (cart.length === 0) {
        alert("Keranjang masih kosong!");
        return;
    }

    let name = prompt("Masukkan nama penerima:");

    if (!name || !name.trim()) return;

    let address = prompt("Masukkan alamat pengiriman:");

    if (!address || !address.trim()) return;

    let message = "HALO TOKO COOKIES! 🍪%0A";
    message += "Saya ingin memesan:%0A%0A";

    let total = 0;

    cart.forEach(item => {

        let subtotal = item.price * item.quantity;

        total += subtotal;

        message += item.name + "%0A";
        message += "Jumlah: " + item.quantity + "%0A";
        message += "Subtotal: Rp " +
            subtotal.toLocaleString("id-ID") + "%0A%0A";
    });

    message += "Nama: " + encodeURIComponent(name) + "%0A";
    message += "Alamat: " + encodeURIComponent(address) + "%0A";
    message += "Total: Rp " + total.toLocaleString("id-ID");

    // GANTI DENGAN NOMOR WHATSAPP TOKO YANG VALID
    let nomorToko = "628xxxxxxxxxx";

    if (nomorToko.includes("x")) {
        alert("08579336484398.");
        return;
    }

    window.open(
        "https://wa.me/" + nomorToko + "?text=" + message,
        "_blank"
    );
}


// ==================================
// THUMBNAIL FOTO PRODUK
// ==================================

function changePhoto(thumbnail) {

    let card = thumbnail.closest(".product-card");

    let mainImage = card.querySelector(".main-product-img");

    mainImage.src = thumbnail.src;

}


// ==================================
// REVIEW PELANGGAN
// ==================================

function addReview(event) {

    event.preventDefault();

    let name = document.getElementById("review-name").value;

    let rating = document.getElementById("review-rating").value;

    let message = document.getElementById("review-message").value;

    let reviewList = document.getElementById("review-list");

    let review = document.createElement("div");

    review.className = "review-card";

    let stars = "★".repeat(Number(rating));

    let starElement = document.createElement("div");
    starElement.className = "stars";
    starElement.textContent = stars;

    let nameElement = document.createElement("h3");
    nameElement.textContent = name;

    let messageElement = document.createElement("p");
    messageElement.textContent = message;

    review.appendChild(starElement);
    review.appendChild(nameElement);
    review.appendChild(messageElement);

    reviewList.appendChild(review);

    alert("Terima kasih sudah memberikan review! ♡");

    event.target.reset();

}


// ==================================
// CONTACT FORM
// ==================================

function sendMessage(event) {

    event.preventDefault();

    alert("Terima kasih sudah menghubungi TOKO COOKIES! ♡");

    event.target.reset();

}


// ==================================
// FALLING COOKIES ANIMATION
// ==================================

function createFallingCookie() {

    let container = document.querySelector(".falling-cookies");

    if (!container) return;

    let cookie = document.createElement("div");

    cookie.className = "falling-cookie";

    cookie.textContent = "🍪";

    cookie.style.left = Math.random() * 100 + "%";

    cookie.style.fontSize = (15 + Math.random() * 20) + "px";

    cookie.style.animationDuration = (5 + Math.random() * 5) + "s";

    container.appendChild(cookie);

    setTimeout(() => {
        cookie.remove();
    }, 11000);

}


// ==================================
// MENJALANKAN SEMUA FUNGSI
// ==================================

document.addEventListener("DOMContentLoaded", function() {

    updateCart();

    renderCart();

    if (document.querySelector(".falling-cookies")) {

        setInterval(createFallingCookie, 800);

    }

});

window.addEventListener("storage", function() {

    cart = JSON.parse(localStorage.getItem("cart")) || [];

    updateCart();

    renderCart();

});
// =================================
// OPENING AMPLOP UNDANGAN
// =================================

function openInvitation() {

    const envelope = document.getElementById("envelope");
    const intro = document.getElementById("intro-screen");
    const website = document.getElementById("main-site");

    // Animasi amplop terbuka
    envelope.classList.add("open");

    // Tunggu amplop terbuka
    setTimeout(function() {

        // Hilangkan halaman pembuka
        intro.classList.add("hide");

        // Tampilkan website
        website.classList.add("show");

    }, 1200);

}