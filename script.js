// Perbanas Event — Kelompok 12 Martrix
// Semua fungsi JavaScript diletakkan di file ini, bukan langsung di dalam HTML.

const STORAGE_KEYS = {
    events: "perbanasEventCustomEvents",
    tickets: "perbanasEventTickets"
};


const defaultEvents = [
    {
        id: "public-lecture-scopus", title: "Public Lecture: Research Fundamentals & Scopus Writing", category: "Seminar",
        date: "2026-05-05", time: "09.00–12.00 WIB", location: "Seminar Room Unit V Lt. 6, Perbanas Institute Jakarta",
        price: 0, capacity: 150, sold: 0,
        description: "Ingin memahami dasar penelitian, meningkatkan kemampuan academic writing, hingga menembus publikasi di jurnal bereputasi internasional? Ini kesempatanmu!",
        image: "image/public.lecture.jpg"
    },
    {
        id: "ceo-lecture-ai", title: "CEO Lecture: Transformasi Perbankan di Era Digital & AI", category: "Seminar",
        date: "2026-04-30", time: "08.30 WIB – Selesai", location: "Lobby Unit VI, Perbanas Institute Jakarta",
        price: 0, capacity: 200, sold: 0,
        description: "Transformasi industri perbankan makin cepat di era digital. Belajar langsung dari jajaran eksekutif perbankan nasional mengenai AI dan keberlanjutan.",
        image: "image/ceo.lecture.jpg"
    },
    {
        id: "workshop-si-cv", title: "Workshop SI: Strategi Menyusun CV & Personal Branding", category: "Workshop",
        date: "2026-04-23", time: "08.30–12.00 WIB", location: "Kampus Perbanas Institute Jakarta",
        price: 0, capacity: 80, sold: 0,
        description: "Mau CV kamu dilirik recruiter atau bingung membangun personal branding yang kuat? Tingkatkan peluang kariermu mulai dari sekarang!",
        image: "image/workshop.si.jpg"
    },
    {
        id: "visiting-lecturer", title: "Visiting Lecturer Series", category: "Seminar",
        date: "2026-04-22", time: "09.30–11.30 WIB", location: "Daring via Zoom Meetings",
        price: 0, capacity: 200, sold: 0,
        description: "AI-Based Risk Analytics for Digital Banking in Financial Inclusion: Cybersecurity, Fraud Detection, and Consumer Protection bersama PUP Philippines.",
        image: "image/visiting.lecturer.jpg"
    },
    {
        id: "snap-2026", title: "Seminar Nasional (SNAP) 2026", category: "Kompetisi",
        date: "2026-11-10", time: "08.00–11.30 WIB", location: "Daring via Zoom Meetings",
        price: 50000, capacity: 100, sold: 0,
        description: "Masa Depan Industri Keuangan Indonesia di Era Kecerdasan Artifisial: Inovasi, Kepercayaan Digital, dan Keberlanjutan.",
        image: "image/snap2026.jpg"
    },
    {
        id: "community-meetup", title: "Community & International Meetup", category: "Komunitas",
        date: "2026-12-15", time: "15.00–17.00 WIB", location: "Student Lounge Perbanas Institute",
        price: 0, capacity: 100, sold: 0,
        description: "Pertemuan santai untuk berbagi pengalaman, memperluas pertemanan, dan membangun jejaring antar mahasiswa serta komunitas kampus.",
        image: "image/perbanas.lounge.jpg"
    },
    {
        id: "campus-outreach", title: "Campus Outreach Program: \"Sustainability in Action\"", category: "Seminar",
        date: "2026-10-19", time: "13.30–15.45 WIB", location: "Ruang Seminar Lt. 3, Griya Perbanas, Jakarta",
        price: 0, capacity: 120, sold: 0,
        description: "Ikuti forum inspiratif bersama para praktisi dan pemimpin industri untuk memperluas wawasan tentang keberlanjutan bagi masa depan!",
        image: "image/campus.outreach.jpg"
    },
    {
        id: "pre-conference-asae", title: "Pre-Conference Workshop ASAE: Agentic AI for Food Security", category: "Workshop",
        date: "2026-10-28", time: "10.00–16.00 WIB", location: "Smart Classroom Unit VI Lantai 2, Perbanas Institute Jakarta",
        price: 0, capacity: 80, sold: 0,
        description: "From Algorithms to Arable Land: A Hands-on Lab on Agentic AI for Food Security bekerjasama dengan ASAE dan Universitas Paramadina.",
        image: "image/asae.ai.jpg"
    },
    {
        id: "uiux-himsi-2026",
        title: "wondrTechnoUpdate - UI/UX Design Seminar 2026",
        category: "Seminar",
        date: "2026-10-15",
        time: "13.00 WIB – Selesai",
        location: "Lobby Unit 6 Lt. 1, Perbanas Institute Jakarta",
        price: 0,
        capacity: 150,
        sold: 0,
        description: "Where Creativity Meets Usability, Redefining Digital Experiences Through UI/UX Innovation. Menghadirkan Yogie Christian (HCD Dept. Head PT Bank Negara Indonesia) & Moderator Dela Fatihah Salsabila.",
        image: "image/himpact.jpg"
    },
    {
        id: "technowdays-himastika-2026",
        title: "TECHNOWDAYS 2026: Beyond AI, Unlocking the Future",
        category: "Seminar",
        date: "2026-10-28",
        time: "09.00 WIB – Selesai",
        location: "Auditorium Perbanas Institute, Jakarta",
        price: 0,
        capacity: 200,
        sold: 0,
        description: "HIMATIKA x HIMASDA mempersembahkan TECHNOWDAYS 2026: Beyond AI, Unlocking the Future with Data & Technology. Membuka wawasan mengenai peran Artificial Intelligence, Data, dan Teknologi dalam menghadapi masa depan di era digital.",
        image: "image/techno.jpg"
    }
];

function readStorage(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value ?? fallback;
    } catch (error) {
        return fallback;
    }
}
let customEvents = readStorage(STORAGE_KEYS.events, []);
let tickets = readStorage(STORAGE_KEYS.tickets, []);
let events = [...defaultEvents, ...customEvents];

function saveEvents() {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(customEvents));
}
function saveTickets() {
    localStorage.setItem(STORAGE_KEYS.tickets, JSON.stringify(tickets));
}
function rupiah(amount) {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(amount) || 0);
}
function prettyDate(dateString) {
    if (!dateString) return "-";
    const date = new Date(`${dateString}T00:00:00`);
    if (Number.isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
}
function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
}
function getEvent(id) {
    return events.find(item => item.id === id);
}
function persistAndRender() {
    saveEvents();
    renderEvents();
    updateTicketCount();
}

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const dateFilter = document.getElementById("dateFilter");
const eventGrid = document.getElementById("eventGrid");
const eventCount = document.getElementById("eventCount");
const emptyState = document.getElementById("emptyState");

function renderEvents() {
    if (!eventGrid) return;
    const keyword = (searchInput?.value || "").trim().toLowerCase();
    const category = categoryFilter?.value || "Semua";
    const dateMode = dateFilter?.value || "";
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filtered = events.filter(event => {
        const haystack = `${event.title} ${event.category} ${event.location} ${event.description}`.toLowerCase();
        const matchesKeyword = haystack.includes(keyword);
        const matchesCategory = category === "Semua" || event.category === category;
        const eventDate = new Date(`${event.date}T00:00:00`);
        const matchesDate = !dateMode ||
            (dateMode === "upcoming" && eventDate >= today) ||
            (dateMode === "past" && eventDate < today);
        return matchesKeyword && matchesCategory && matchesDate;
    });

    eventGrid.innerHTML = filtered.map(event => `
        <article class="event-card">
            <a class="event-image-link" href="event-detail.html?id=${encodeURIComponent(event.id)}" aria-label="Lihat detail ${escapeHTML(event.title)}">
                <img class="event-image" src="${escapeHTML(event.image || "")}" alt="${escapeHTML(event.title)}" loading="lazy"
                    onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80';">
                <span class="event-badge">${escapeHTML(event.category)}</span>
            </a>
            <div class="event-body">
                <div class="event-date"><i class="fa-regular fa-calendar"></i> ${escapeHTML(prettyDate(event.date))} · ${escapeHTML(event.time)}</div>
                <h3><a href="event-detail.html?id=${encodeURIComponent(event.id)}">${escapeHTML(event.title)}</a></h3>
                <p class="event-location"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(event.location)}</p>
                <p class="event-description">${escapeHTML(event.description)}</p>
                <div class="event-bottom"><div><small>Harga tiket</small><strong>${event.price === 0 ? "Gratis" : rupiah(event.price)}</strong></div>
                <button class="btn btn-primary btn-small" type="button" data-action="detail" data-id="${escapeHTML(event.id)}">Lihat Detail</button></div>
                <div class="availability">${Math.max(0, event.capacity - event.sold)} tiket tersedia</div>
            </div>
        </article>
    `).join("");

    if (eventCount) eventCount.textContent = `${filtered.length} acara ditemukan`;
    if (emptyState) emptyState.hidden = filtered.length > 0;
    const heroCount = document.getElementById("heroEventCount");
    if (heroCount) heroCount.textContent = `${events.length}`;
}

function setCategory(category) {
    if (categoryFilter) categoryFilter.value = category;
    document.querySelectorAll(".cat").forEach(button => {
        button.classList.toggle("active", button.dataset.category === category);
    });
    renderEvents();
}
searchInput?.addEventListener("input", renderEvents);
categoryFilter?.addEventListener("change", () => setCategory(categoryFilter.value));
dateFilter?.addEventListener("change", renderEvents);
document.getElementById("searchBtn")?.addEventListener("click", renderEvents);
document.getElementById("resetFilterBtn")?.addEventListener("click", () => {
    if (searchInput) searchInput.value = "";
    if (dateFilter) dateFilter.value = "";
    setCategory("Semua");
});
document.querySelectorAll(".cat").forEach(button => button.addEventListener("click", () => setCategory(button.dataset.category)));

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.hidden = false;
        document.body.classList.add("modal-open");
        const focusable = modal.querySelector("input, select, textarea, button");
        focusable?.focus();
    }
}
function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.hidden = true;
    if (![...document.querySelectorAll(".overlay")].some(item => !item.hidden)) {
        document.body.classList.remove("modal-open");
    }
}
document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => closeModal(button.dataset.close));
});
document.querySelectorAll(".overlay").forEach(overlay => {
    overlay.addEventListener("click", event => {
        if (event.target === overlay) closeModal(overlay.id);
    });
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.querySelectorAll(".overlay:not([hidden])").forEach(modal => closeModal(modal.id));
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}
function openDetail(id) {
    const event = getEvent(id);
    if (!event) return;
    const content = document.getElementById("detailContent");
    content.innerHTML = `
        <img class="modal-poster" src="${escapeHTML(event.image || "")}" alt="${escapeHTML(event.title)}"
             onerror="this.style.display='none'">
        <span class="event-badge inline-badge">${escapeHTML(event.category)}</span>
        <h3 class="modal-event-title">${escapeHTML(event.title)}</h3>
        <p class="modal-meta"><i class="fa-regular fa-calendar"></i> ${escapeHTML(prettyDate(event.date))} · ${escapeHTML(event.time)}</p>
        <p class="modal-meta"><i class="fa-solid fa-location-dot"></i> ${escapeHTML(event.location)}</p>
        <p class="modal-description">${escapeHTML(event.description)}</p>
        <div class="modal-facts">
            <div><small>Harga tiket</small><strong>${event.price === 0 ? "Gratis" : rupiah(event.price)}</strong></div>
            <div><small>Kapasitas tersisa</small><strong>${Math.max(0, event.capacity - event.sold)} tiket</strong></div>
        </div>
        <p><a class="map-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-map-location-dot"></i> Lihat lokasi di Google Maps</a></p>
        <div class="modal-actions">
            <a class="btn btn-light" href="event-detail.html?id=${encodeURIComponent(event.id)}">Halaman Detail</a>
            <button class="btn btn-primary" type="button" data-action="checkout" data-id="${escapeHTML(event.id)}">Pesan Tiket</button>
        </div>
    `;
    openModal("detailModal");
}
// TAMBAHKAN KODE INI TEPAT DI BAWAH FUNGSI openDetail:
document.getElementById("detailContent")?.addEventListener("click", event => {
    const button = event.target.closest("[data-action='checkout']");
    if (button) {
        openCheckout(button.dataset.id);
    }
});
function openCheckout(id) {
    const event = getEvent(id);
    if (!event) return;
    if (event.sold >= event.capacity) {
        showToast("Maaf, tiket acara ini sudah habis.");
        return;
    }
    closeModal("detailModal");
    const content = document.getElementById("checkoutContent");
    content.innerHTML = `
        <h3 class="modal-event-title">${escapeHTML(event.title)}</h3>
        <p class="modal-meta">${escapeHTML(prettyDate(event.date))} · ${escapeHTML(event.location)}</p>
        <form id="checkoutForm">
            <label for="buyerName">Nama lengkap peserta</label><input id="buyerName" name="buyerName" required minlength="2" maxlength="100" placeholder="Masukkan nama lengkap">
            <label for="buyerEmail">Email aktif</label><input id="buyerEmail" name="buyerEmail" type="email" required placeholder="nama@email.com">
            <label for="ticketQty">Jumlah tiket</label>
            <select id="ticketQty" name="ticketQty">
                ${[1,2,3,4,5].map(qty => `<option value="${qty}" ${qty > event.capacity - event.sold ? "disabled" : ""}>${qty} tiket</option>`).join("")}
            </select>
            <div class="total"><span>Total pembayaran</span><strong id="checkoutTotal">${event.price === 0 ? "Gratis" : rupiah(event.price)}</strong></div>
            <p class="demo-note">Ini merupakan simulasi. Tidak ada pembayaran nyata yang diproses.</p>
            <button class="btn btn-primary full-width" type="submit">Konfirmasi Pesanan <i class="fa-solid fa-check"></i></button>
        </form>
    `;
    const qtyInput = document.getElementById("ticketQty");
    const totalOutput = document.getElementById("checkoutTotal");
    const updateTotal = () => {
        const qty = Number(qtyInput.value);
        totalOutput.textContent = event.price === 0 ? "Gratis" : rupiah(event.price * qty);
    };
    qtyInput.addEventListener("change", updateTotal);
    document.getElementById("checkoutForm").addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("buyerName").value.trim();
        const email = document.getElementById("buyerEmail").value.trim();
        const qty = Number(qtyInput.value);
        if (name.length < 2 || !document.getElementById("buyerEmail").validity.valid) {
            showToast("Masukkan nama dan email yang valid.");
            return;
        }
        if (qty < 1 || qty > 5 || event.capacity - event.sold < qty) {
            showToast("Jumlah tiket tidak tersedia.");
            return;
        }
        const ticket = {
            code: "PE" + Date.now().toString().slice(-8),
            eventId: event.id, title: event.title, name, email, qty,
            total: event.price * qty, date: event.date, time: event.time,
            location: event.location, created: new Date().toLocaleString("id-ID")
        };
        tickets.push(ticket);
        event.sold += qty;
        saveTickets();
        saveEvents();
        closeModal("checkoutModal");
        renderEvents();
        updateTicketCount();
        showTicketReceipt(ticket);
    });
    openModal("checkoutModal");
}

function showTicketReceipt(ticket) {
    const content = document.getElementById("ticketsContent");
    content.innerHTML = `
        <div class="receipt-success"><i class="fa-solid fa-circle-check"></i><h3>Pesanan berhasil dibuat!</h3><p>Ini adalah tiket demo, bukan bukti pembayaran.</p></div>
        <div class="receipt-code"><small>KODE BOOKING</small><strong>${escapeHTML(ticket.code)}</strong></div>
        <div class="receipt-list">
            <div><span>Nama</span><strong>${escapeHTML(ticket.name)}</strong></div>
            <div><span>Acara</span><strong>${escapeHTML(ticket.title)}</strong></div>
            <div><span>Tanggal</span><strong>${escapeHTML(prettyDate(ticket.date))}</strong></div>
            <div><span>Waktu</span><strong>${escapeHTML(ticket.time)}</strong></div>
            <div><span>Lokasi</span><strong>${escapeHTML(ticket.location)}</strong></div>
            <div><span>Jumlah tiket</span><strong>${ticket.qty} tiket</strong></div>
            <div><span>Total</span><strong>${ticket.total === 0 ? "Gratis" : rupiah(ticket.total)}</strong></div>
        </div>
        <button class="btn btn-primary full-width" type="button" id="receiptDoneBtn">Selesai</button>
    `;
    document.getElementById("receiptDoneBtn").addEventListener("click", () => closeModal("ticketsModal"));
    openModal("ticketsModal");
}
function openTickets() {
    const content = document.getElementById("ticketsContent");
    if (!tickets.length) {
        content.innerHTML = `<div class="empty-tickets"><i class="fa-solid fa-ticket"></i><h3>Belum ada tiket</h3><p>Pesan acara yang kamu minati, lalu tiket demo akan muncul di sini.</p><button class="btn btn-primary" id="findEventsBtn" type="button">Jelajahi Acara</button></div>`;
        document.getElementById("findEventsBtn").addEventListener("click", () => {
            closeModal("ticketsModal");
            document.getElementById("events").scrollIntoView({ behavior: "smooth" });
        });
    } else {
        content.innerHTML = `<div class="ticket-list">${tickets.slice().reverse().map(ticket => `
            <article class="ticket-item">
                <div class="ticket-item-top"><span class="event-badge inline-badge">Tiket Demo</span><strong>${escapeHTML(ticket.code)}</strong></div>
                <h3>${escapeHTML(ticket.title)}</h3>
                <p><i class="fa-regular fa-calendar"></i> ${escapeHTML(prettyDate(ticket.date))} · ${escapeHTML(ticket.time)}</p>
                <p><i class="fa-solid fa-location-dot"></i> ${escapeHTML(ticket.location)}</p>
                <div class="ticket-item-bottom"><span>${ticket.qty} tiket</span><strong>${ticket.total === 0 ? "Gratis" : rupiah(ticket.total)}</strong></div>
            </article>`).join("")}</div>`;
    }
    openModal("ticketsModal");
}
function updateTicketCount() {
    const count = document.getElementById("ticketCount");
    if (count) count.textContent = tickets.length ? `(${tickets.length})` : "";
}
function openOrganizer() {
    document.getElementById("organizerForm")?.reset();
    const dateInput = document.getElementById("newDate");
    if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);
    openModal("organizerModal");
}
function createEvent(event) {
    event?.preventDefault();
    const title = document.getElementById("newTitle").value.trim();
    const category = document.getElementById("newCategory").value;
    const date = document.getElementById("newDate").value;
    const time = document.getElementById("newTime").value.trim();
    const location = document.getElementById("newLocation").value.trim();
    const price = Number(document.getElementById("newPrice").value);
    const capacity = Number(document.getElementById("newCapacity").value);
    const description = document.getElementById("newDescription").value.trim();
    const image = document.getElementById("newImage").value.trim() ||
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85";
    if (!title || !date || !time || !location || !description || price < 0 || capacity < 1) {
        showToast("Lengkapi seluruh informasi acara dengan benar.");
        return;
    }
    const newEvent = {
        id: "event-" + Date.now(), title, category, date, time, location,
        price, capacity, sold: 0, description, image
    };
    customEvents.push(newEvent);
    events.push(newEvent);
    saveEvents();
    closeModal("organizerModal");
    if (searchInput) searchInput.value = "";
    if (dateFilter) dateFilter.value = "";
    setCategory("Semua");
    showToast("Acara berhasil ditambahkan ke daftar.");
}
eventGrid?.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    if (button.dataset.action === "detail") openDetail(button.dataset.id);
    if (button.dataset.action === "checkout") openCheckout(button.dataset.id);
});
document.getElementById("openTicketsBtn")?.addEventListener("click", openTickets);
document.getElementById("openOrganizerBtn")?.addEventListener("click", openOrganizer);
document.getElementById("createEventBtn")?.addEventListener("click", openOrganizer);
document.getElementById("organizerForm")?.addEventListener("submit", createEvent);

// API sederhana agar dapat dipakai dari tombol inline jika dibutuhkan
window.renderEvents = renderEvents;
window.setCategory = setCategory;
window.openTickets = openTickets;
window.openOrganizer = openOrganizer;
window.openCheckout = openCheckout;
window.closeModal = closeModal;

renderEvents();
updateTicketCount();

// Fungsi untuk Memperbarui Tampilan Header Sesuai Status Login
function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem("perbanasCurrentUser"));
    const authBtn = document.getElementById("openAuthBtn");
    
    if (authBtn && currentUser) {
        authBtn.innerHTML = `<i class="fa-solid fa-user-check"></i> ${currentUser.name}`;
        authBtn.onclick = () => {
            if (confirm(`Halo ${currentUser.name}, apakah kamu ingin keluar (logout)?`)) {
                localStorage.removeItem("perbanasCurrentUser");
                updateAuthUI();
                showToast("Berhasil keluar.");
            }
        };
    } else if (authBtn) {
        authBtn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Masuk / Daftar`;
        authBtn.onclick = () => openModal("authModal");
    }
}

// Handler Submit Form Login
document.getElementById("authForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("authEmail").value.trim();
    const name = email.split('@')[0];
    
    // Simpan status user aktif di LocalStorage
    localStorage.setItem("perbanasCurrentUser", JSON.stringify({ name, email }));
    
    closeModal("authModal");
    updateAuthUI();
    showToast(`Selamat datang kembali, ${name}!`);
});

// Jalankan pengecekan status saat halaman dimuat
updateAuthUI();

// Membuka Modal Panduan Pemesanan
document.getElementById("openFaqBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    openModal("faqModal");
});