/**
 * Real content migrated from the previous site (uneeddeveloper.web.id).
 * Static for now — shape mirrors the Prisma models in the project spec
 * (Service, PortfolioItem) so this doubles as the seed source once the
 * database lands.
 */

export const CONTACT = {
  whatsapp: "6285705041136",
  whatsappDisplay: "0857-0504-1136",
  instagram: "https://www.instagram.com/uneeddeveloper/",
  instagramHandle: "@uneeddeveloper",
  email: "uneeddeveloper2025@gmail.com",
  address: "Purnajaya 1 Jalur II No.28, Pontianak Utara, Kota Pontianak, Kalimantan Barat, Indonesia",
};

export const TEAM = [
  { name: "Herman Firmansyah", role: "Developer" },
  { name: "Rizki Syahwal Ludiansyah", role: "Developer" },
  { name: "Reza Ikhsanda", role: "Developer" },
  { name: "Alexander Rikky", role: "Developer" },
  { name: "Derry Meiraldy", role: "Developer" },
];

export type ServiceCategoryMeta = {
  slug: string;
  name: string;
  description: string;
};

/**
 * The 7 top-level categories shown as a teaser on the homepage and as
 * section headers in the full catalog at /layanan.
 */
export const SERVICE_CATEGORIES: ServiceCategoryMeta[] = [
  {
    slug: "pelaporan-dashboard",
    name: "Pelaporan & Dashboard",
    description:
      "Ubah data mentah menjadi wawasan bisnis yang berharga melalui dashboard interaktif dan sistem pelaporan otomatis.",
  },
  {
    slug: "web-application",
    name: "Web Application",
    description:
      "Membangun aplikasi web yang skalabel, aman, dan responsif menggunakan teknologi modern terkini.",
  },
  {
    slug: "mobile-application",
    name: "Mobile Application",
    description:
      "Jangkau pengguna di mana saja dengan aplikasi mobile native performa tinggi untuk iOS dan Android.",
  },
  {
    slug: "backend-api",
    name: "Backend & API",
    description:
      "Pondasi kuat untuk aplikasi Anda dengan arsitektur server yang handal dan API yang teroptimasi.",
  },
  {
    slug: "custom-system",
    name: "Custom System",
    description:
      "Sistem yang dirancang khusus sesuai dengan alur kerja unik bisnis Anda. Tidak ada batasan fitur.",
  },
  {
    slug: "konsultasi-it",
    name: "Konsultasi IT",
    description:
      "Bingung mulai dari mana? Diskusikan ide Anda dengan tim ahli kami untuk mendapatkan roadmap terbaik.",
  },
  {
    slug: "maintenance",
    name: "Maintenance Application",
    description:
      "Menjaga aplikasi Anda tetap update, aman, dan bebas bug dengan layanan maintenance berkelanjutan.",
  },
];

export type ServiceCatalogItem = {
  categorySlug: string;
  name: string;
  description: string;
  /** Left unset unless a real price is provided — never fabricate a number here. */
  priceRange?: string;
};

/**
 * Orderable catalog items within each category — the "template pengerjaan"
 * a visitor picks and orders directly from /layanan. Shape mirrors the
 * Prisma `Service` model (category + name + description + priceRange).
 */
export const SERVICE_CATALOG: ServiceCatalogItem[] = [
  {
    categorySlug: "pelaporan-dashboard",
    name: "Dashboard Analitik Interaktif",
    description: "Visualisasi data real-time untuk memantau performa bisnis dalam satu tampilan.",
  },
  {
    categorySlug: "pelaporan-dashboard",
    name: "Sistem Laporan Otomatis",
    description: "Laporan berkala yang digenerate otomatis dan siap export ke PDF/Excel.",
  },
  {
    categorySlug: "web-application",
    name: "Company Profile",
    description: "Website resmi untuk memperkenalkan bisnis Anda secara profesional.",
  },
  {
    categorySlug: "web-application",
    name: "Landing Page",
    description: "Halaman promosi fokus konversi untuk kampanye atau produk tertentu.",
  },
  {
    categorySlug: "web-application",
    name: "SaaS / Admin Panel",
    description: "Aplikasi web dengan sistem login, role, dan manajemen data lengkap.",
  },
  {
    categorySlug: "web-application",
    name: "E-Commerce",
    description: "Toko online lengkap dengan katalog produk dan sistem pembayaran.",
  },
  {
    categorySlug: "mobile-application",
    name: "Aplikasi iOS & Android",
    description: "Aplikasi mobile cross-platform dengan performa native menggunakan Flutter.",
  },
  {
    categorySlug: "mobile-application",
    name: "MVP Mobile App",
    description: "Versi awal aplikasi untuk validasi ide sebelum pengembangan penuh.",
  },
  {
    categorySlug: "backend-api",
    name: "REST API Custom",
    description: "API yang dirancang khusus sesuai kebutuhan sistem Anda.",
  },
  {
    categorySlug: "backend-api",
    name: "Integrasi Sistem Pihak Ketiga",
    description: "Menghubungkan aplikasi Anda dengan payment gateway, SMS gateway, atau layanan eksternal lain.",
  },
  {
    categorySlug: "custom-system",
    name: "Sistem ERP",
    description: "Kelola operasional bisnis secara terpusat dari satu sistem.",
  },
  {
    categorySlug: "custom-system",
    name: "CRM Custom",
    description: "Kelola hubungan pelanggan dan pipeline penjualan sesuai alur kerja Anda.",
  },
  {
    categorySlug: "custom-system",
    name: "Inventory Management",
    description: "Pantau stok dan pergerakan barang secara real-time.",
  },
  {
    categorySlug: "custom-system",
    name: "HRIS",
    description: "Sistem kepegawaian untuk absensi, penggajian, dan data karyawan.",
  },
  {
    categorySlug: "konsultasi-it",
    name: "Konsultasi Tech Stack",
    description: "Diskusi teknologi yang paling cocok untuk kebutuhan dan skala bisnis Anda.",
  },
  {
    categorySlug: "konsultasi-it",
    name: "Audit Sistem & Roadmap",
    description: "Evaluasi sistem yang sudah ada dan susun rencana pengembangan ke depan.",
  },
  {
    categorySlug: "maintenance",
    name: "Paket Maintenance Bulanan",
    description: "Pemeliharaan rutin: update, monitoring, dan backup berkala.",
  },
  {
    categorySlug: "maintenance",
    name: "Bug Fixing & Support",
    description: "Perbaikan cepat saat aplikasi Anda mengalami kendala.",
  },
];

export type PortfolioItem = {
  slug: string;
  title: string;
  type: string;
  /** References a SERVICE_CATEGORIES slug — portfolio is grouped by the service that produced it. */
  categorySlug: string;
  description: string;
  detail: string;
  /** Some projects may not have a live link — the detail page hides the button when unset. */
  link?: string;
  image: string;
};

export function serviceCategoryName(slug: string) {
  return SERVICE_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

export const PORTFOLIO: PortfolioItem[] = [
  {
    slug: "pt-triputra-khatulistiwa",
    title: "PT. Triputra Khatulistiwa",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Web company profile PT. Triputra Khatulistiwa",
    detail:
      "Company profile untuk PT. Triputra Khatulistiwa, perusahaan logistik yang melayani pengiriman ke seluruh Kalimantan Barat. Website ini menampilkan layanan, jangkauan pengiriman, dan kanal kontak agar calon klien bisa langsung menghubungi tim mereka.",
    link: "https://pt-triputra.vercel.app/",
    image: "/portfolio/pt-triputra.webp",
  },
  {
    slug: "las-beauty",
    title: "LAS Beauty",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Web company profile LAS Brightening",
    detail:
      "Company profile untuk LAS Brightening, lini produk skincare pencerah kulit. Website menampilkan katalog produk beserta manfaatnya dengan tampilan yang bersih dan sesuai identitas brand kecantikan.",
    link: "https://las-beauty.vercel.app/",
    image: "/portfolio/las-beauty.webp",
  },
  {
    slug: "undangan-digital",
    title: "Undangan Digital",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Undangan Digital Template",
    detail:
      "Template undangan pernikahan digital yang bisa dipersonalisasi — nama mempelai, tanggal acara, lokasi, hingga galeri foto — sebagai alternatif undangan cetak yang lebih praktis dibagikan lewat chat.",
    link: "https://undangan-beta-two.vercel.app/",
    image: "/portfolio/undangan-digital.webp",
  },
  {
    slug: "smart-recruitment",
    title: "Smart Recruitment",
    type: "WEB APP",
    categorySlug: "custom-system",
    description: "Web penerimaan karyawan terintegrasi AI",
    detail:
      "Platform penerimaan karyawan yang mengintegrasikan proses seleksi dengan bantuan AI, mulai dari pendaftaran kandidat hingga portal untuk memantau status lamaran secara transparan.",
    link: "https://smart-recruit-rouge.vercel.app/portal",
    image: "/portfolio/smart-recruitment.webp",
  },
  {
    slug: "edugate",
    title: "EduGate",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Website Pengelolaan Tugas",
    detail:
      "Aplikasi web untuk pengelolaan tugas di lingkungan pendidikan — membantu pengajar mendistribusikan tugas dan siswa memantau serta mengumpulkan pekerjaan mereka dalam satu tempat.",
    link: "https://edugate-ashy.vercel.app/",
    image: "/portfolio/edugate.webp",
  },
  {
    slug: "raneen-coffee",
    title: "Raneen Coffee",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Web Coffee + E-Book",
    detail:
      "Website untuk brand kopi Raneen Coffee, menampilkan profil coffee shop sekaligus e-book seputar kopi sebagai konten tambahan untuk menarik pengunjung.",
    link: "https://hrmnfrmnsyh1210-sys.github.io/raneen-coffee/",
    image: "/portfolio/raneen-coffee.webp",
  },
  {
    slug: "service-ac",
    title: "Service AC",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Web Jasa Service AC",
    detail:
      "Website untuk usaha jasa service dan perawatan AC di Pontianak — menampilkan daftar layanan, jam operasional, dan kanal pemesanan agar pelanggan mudah menghubungi teknisi.",
    link: "https://hrmnfrmnsyh1210-sys.github.io/service-ac/",
    image: "/portfolio/service-ac.webp",
  },
  {
    slug: "js-beauty",
    title: "J&S Beauty",
    type: "WEB APP",
    categorySlug: "web-application",
    description: "Web Haircut & Stylish Panggilan",
    detail:
      "Website untuk salon kecantikan panggilan J&S Beauty, menampilkan daftar layanan haircut dan styling beserta cara pemesanan untuk layanan panggilan ke rumah.",
    link: "https://hrmnfrmnsyh1210-sys.github.io/J-S-Beauty/",
    image: "/portfolio/js-beauty.webp",
  },
  {
    slug: "sitara",
    title: "SITARA",
    type: "WEB APP",
    categorySlug: "custom-system",
    description: "Sistem Tes Akademik Terpadu",
    detail:
      "Sistem Tes Akademik Terpadu (SITARA) — platform ujian akademik daring lengkap dengan manajemen soal, sesi ujian terjadwal, dan rekap hasil peserta.",
    link: "https://sitara.simpeda.id/",
    image: "/portfolio/sitara.webp",
  },
];

export function waLink(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Accepts any {name} — a static SERVICE_CATALOG row or a live Prisma Service row alike. */
export function waLinkForService(item: { name: string }, categoryName: string) {
  return waLink(
    `Halo Uneed Developer, saya tertarik dengan layanan "${item.name}" (${categoryName}). Boleh info lebih lanjut?`
  );
}
