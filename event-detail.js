// ==========================================
// 1. DATA DEFAULT & KONSTANTA
// ==========================================
const DETAIL_DEFAULTS = [
  {
    id: "public-lecture-scopus",
    title: "Public Lecture: Research Fundamentals & Scopus Writing",
    category: "Seminar",
    date: "2026-05-05",
    time: "09.00–12.00 WIB",
    location: "Seminar Room Unit V Lt. 6, Perbanas Institute Jakarta",
    price: 0,
    capacity: 150,
    sold: 0,
    description: "Ingin memahami dasar penelitian, meningkatkan kemampuan academic writing, hingga menembus publikasi di jurnal bereputasi internasional? Ini kesempatanmu!",
    image: "image/public.lecture.jpg"
  },
  {
    id: "ceo-lecture-ai",
    title: "CEO Lecture: Transformasi Perbankan di Era Digital & AI",
    category: "Seminar",
    date: "2026-04-30",
    time: "08.30 WIB – Selesai",
    location: "Lobby Unit VI, Perbanas Institute Jakarta",
    price: 0,
    capacity: 200,
    sold: 0,
    description: "Transformasi industri perbankan makin cepat di era digital. Belajar langsung dari jajaran eksekutif perbankan nasional mengenai AI dan keberlanjutan.",
    image: "image/ceo.lecture.jpg"
  },
  {
    id: "workshop-si-cv",
    title: "Workshop SI: Strategi Menyusun CV & Personal Branding",
    category: "Workshop",
    date: "2026-04-23",
    time: "08.30–12.00 WIB",
    location: "Kampus Perbanas Institute Jakarta",
    price: 0,
    capacity: 80,
    sold: 0,
    description: "Mau CV kamu dilirik recruiter atau bingung membangun personal branding yang kuat? Tingkatkan peluang kariermu mulai dari sekarang!",
    image: "image/workshop.si.jpg"
  },
  {
    id: "community-meetup",
    title: "Community & International Meetup",
    category: "Komunitas",
    date: "2026-12-15",
    time: "15.00–17.00 WIB",
    location: "Student Lounge Perbanas Institute",
    price: 0,
    capacity: 100,
    sold: 0,
    description: "Pertemuan untuk berbagi pengalaman, memperluas pertemanan, dan membangun jejaring antar mahasiswa.",
    image: "image/perbanas.lounge.jpg"
  },
  {
    id: "visiting-lecturer",
    title: "Visiting Lecturer Series",
    category: "Seminar",
    date: "2026-04-22",
    time: "09.30–11.30 WIB",
    location: "Daring via Zoom Meetings",
    price: 0,
    capacity: 200,
    sold: 0,
    description: "AI-Based Risk Analytics for Digital Banking in Financial Inclusion: Cybersecurity, Fraud Detection, and Consumer Protection bersama PUP Philippines.",
    image: "image/visiting.lecturer.jpg"
  },
  {
    id: "snap-2026",
    title: "Seminar Nasional (SNAP) 2026",
    category: "Kompetisi",
    date: "2026-11-10",
    time: "08.00–11.30 WIB",
    location: "Daring via Zoom Meetings",
    price: 50000,
    capacity: 100,
    sold: 0,
    description: "Masa Depan Industri Keuangan Indonesia di Era Kecerdasan Artifisial: Inovasi, Kepercayaan Digital, dan Keberlanjutan.",
    image: "image/snap2026.jpg"
  },
  {
    id: "campus-outreach",
    title: "Campus Outreach Program: \"Sustainability in Action\"",
    category: "Seminar",
    date: "2026-10-19",
    time: "13.30–15.45 WIB",
    location: "Ruang Seminar Lt. 3, Griya Perbanas, Jakarta",
    price: 0,
    capacity: 120,
    sold: 0,
    description: "Ikuti forum inspiratif bersama para praktisi dan pemimpin industri untuk memperluas wawasan tentang keberlanjutan bagi masa depan!",
    image: "image/campus.outreach.jpg"
  },
  {
    id: "pre-conference-asae",
    title: "Pre-Conference Workshop ASAE: Agentic AI for Food Security",
    category: "Workshop",
    date: "2026-10-28",
    time: "10.00–16.00 WIB",
    location: "Smart Classroom Unit VI Lantai 2, Perbanas Institute Jakarta",
    price: 0,
    capacity: 80,
    sold: 0,
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

const DETAIL_EVENT_KEY = "perbanasEventCustomEvents";
const DETAIL_TICKET_KEY = "perbanasEventTickets";

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
function safeRead(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function money(n) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(n) || 0);
}

function dateLabel(d) {
  const date = new Date(`${d}T00:00:00`);
  return isNaN(date)
    ? d
    : new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function toast(message) {
  const el = document.getElementById("toast");
  el.textContent = message;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.hidden = true;
  document.body.classList.remove("modal-open");
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) {
    el.hidden = false;
    document.body.classList.add("modal-open");
  }
}

// ==========================================
// 3. INISIALISASI DATA DETAIL
// ==========================================
const allDetailEvents = [...DETAIL_DEFAULTS, ...safeRead(DETAIL_EVENT_KEY, [])];
const params = new URLSearchParams(location.search);
const selected = allDetailEvents.find((e) => e.id === params.get("id")) || allDetailEvents[0];

// Update DOM dengan data acara yang dipilih
document.title = `${selected.title} — Perbanas Event`;
document.getElementById("crumbTitle").textContent = selected.title;
document.getElementById("detailTitle").textContent = selected.title;
document.getElementById("detailCategory").textContent = selected.category;
document.getElementById("detailDate").textContent = dateLabel(selected.date);
document.getElementById("detailTime").textContent = selected.time;
document.getElementById("detailLocation").textContent = selected.location;
document.getElementById("detailDescription").textContent = selected.description;
document.getElementById("detailAddress").textContent = selected.location;
document.getElementById("detailAbout").textContent = `${selected.description} Pastikan kamu memeriksa jadwal dan lokasi acara sebelum melakukan pemesanan.`;
document.getElementById("detailPrice").textContent = selected.price === 0 ? "Gratis" : money(selected.price);

const image = document.getElementById("detailImage");
image.src = selected.image || "";
image.alt = selected.title;
image.onerror = () => { image.style.display = "none"; };

document.getElementById("mapsLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.location)}`;

// ==========================================
// 4. RENDER ACARA TERKAIT (RELATED EVENTS)
// ==========================================
const related = document.getElementById("relatedEvents");
allDetailEvents
  .filter((e) => e.id !== selected.id)
  .slice(0, 3)
  .forEach((e) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.innerHTML = `
      <a class="event-image-link" href="event-detail.html?id=${encodeURIComponent(e.id)}">
        <img class="event-image" src="${esc(e.image || "")}" alt="${esc(e.title)}" loading="lazy" onerror="this.style.display='none'">
        <span class="event-badge">${esc(e.category)}</span>
      </a>
      <div class="event-body">
        <div class="event-date"><i class="fa-regular fa-calendar"></i> ${esc(dateLabel(e.date))}</div>
        <h3><a href="event-detail.html?id=${encodeURIComponent(e.id)}">${esc(e.title)}</a></h3>
        <p class="event-location"><i class="fa-solid fa-location-dot"></i> ${esc(e.location)}</p>
        <div class="event-bottom">
          <div>
            <small>Harga tiket</small>
            <strong>${e.price === 0 ? "Gratis" : money(e.price)}</strong>
          </div>
          <a class="btn btn-primary btn-small" href="event-detail.html?id=${encodeURIComponent(e.id)}">Lihat Detail</a>
        </div>
      </div>
    `;
    related.appendChild(card);
  });

// ==========================================
// 5. MODAL & PROSES PEMESANAN (CHECKOUT)
// ==========================================
const checkoutModal = document.getElementById("checkoutModal");
const ticketsModal = document.getElementById("ticketsModal");
const checkoutContent = document.getElementById("checkoutContent");

// Event listener penutup modal
document.getElementById("closeCheckout").addEventListener("click", () => closeModal("checkoutModal"));
document.getElementById("closeTickets").addEventListener("click", () => closeModal("ticketsModal"));

[checkoutModal, ticketsModal].forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target === el) closeModal(el.id);
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal("checkoutModal");
    closeModal("ticketsModal");
  }
});

// Event Handler Tombol "Pesan Tiket"
document.getElementById("bookFromDetail").addEventListener("click", () => {
  const remaining = selected.capacity - (selected.sold || 0);
  if (remaining <= 0) {
    toast("Maaf, tiket acara ini sudah habis.");
    return;
  }

  // Inject Form Checkout ke Modal
  checkoutContent.innerHTML = `
    <h3 class="modal-event-title">${esc(selected.title)}</h3>
    <p class="modal-meta">${esc(dateLabel(selected.date))} · ${esc(selected.location)}</p>
    <form id="detailCheckoutForm">
      <label for="buyerName">Nama lengkap peserta</label>
      <input id="buyerName" required minlength="2" maxlength="100" placeholder="Masukkan nama lengkap">
      
      <label for="buyerEmail">Email aktif</label>
      <input id="buyerEmail" type="email" required placeholder="nama@email.com">
      
      <label for="ticketQty">Jumlah tiket</label>
      <select id="ticketQty">
        ${[1, 2, 3, 4, 5]
          .filter((n) => n <= remaining)
          .map((n) => `<option value="${n}">${n} tiket</option>`)
          .join("")}
      </select>
      
      <div class="total">
        <span>Total pembayaran</span>
        <strong id="checkoutTotal">${selected.price === 0 ? "Gratis" : money(selected.price)}</strong>
      </div>
      
      <p class="demo-note">Simulasi pemesanan. Pembayaran nyata belum diproses.</p>
      <button class="btn btn-primary full-width" type="submit">Konfirmasi Pesanan</button>
    </form>
  `;

  const qty = document.getElementById("ticketQty");
  const total = document.getElementById("checkoutTotal");

  // Update total harga saat jumlah tiket berubah
  qty.addEventListener("change", () => {
    total.textContent = selected.price === 0 ? "Gratis" : money(selected.price * Number(qty.value));
  });

  // Submit Handler untuk Form Pemesanan
  document.getElementById("detailCheckoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("buyerName").value.trim();
    const email = document.getElementById("buyerEmail").value.trim();
    const quantity = Number(qty.value);

    // Objek Tiket
    const ticket = {
      code: "PE" + Date.now().toString().slice(-8),
      eventId: selected.id,
      title: selected.title,
      name,
      email,
      qty: quantity,
      total: selected.price * quantity,
      date: selected.date,
      time: selected.time,
      location: selected.location,
      created: new Date().toLocaleString("id-ID")
    };

    // Simpan Tiket ke LocalStorage
    const tickets = safeRead(DETAIL_TICKET_KEY, []);
    tickets.push(ticket);
    localStorage.setItem(DETAIL_TICKET_KEY, JSON.stringify(tickets));

    // Update jumlah tiket terjual jika ini acara custom
    const custom = safeRead(DETAIL_EVENT_KEY, []);
    const customEvent = custom.find((e) => e.id === selected.id);
    if (customEvent) {
      customEvent.sold = (customEvent.sold || 0) + quantity;
      localStorage.setItem(DETAIL_EVENT_KEY, JSON.stringify(custom));
    }

    closeModal("checkoutModal");

    // Render Bukti Pembayaran / Struk Pemesanan
    document.getElementById("ticketsContent").innerHTML = `
      <div class="receipt-success">
        <i class="fa-solid fa-circle-check"></i>
        <h3>Pesanan demo berhasil!</h3>
        <p>Tiket ini belum menjadi bukti pembayaran.</p>
      </div>
      <div class="receipt-code">
        <small>KODE BOOKING</small>
        <strong>${esc(ticket.code)}</strong>
      </div>
      <div class="receipt-list">
        <div><span>Nama</span><strong>${esc(name)}</strong></div>
        <div><span>Acara</span><strong>${esc(selected.title)}</strong></div>
        <div><span>Tanggal</span><strong>${esc(dateLabel(selected.date))}</strong></div>
        <div><span>Jumlah tiket</span><strong>${quantity}</strong></div>
        <div><span>Total</span><strong>${ticket.total === 0 ? "Gratis" : money(ticket.total)}</strong></div>
      </div>
      <button class="btn btn-primary full-width" id="finishReceipt">Selesai</button>
    `;

    document.getElementById("finishReceipt").addEventListener("click", () => closeModal("ticketsModal"));
    openModal("ticketsModal");
  });

  openModal("checkoutModal");
});