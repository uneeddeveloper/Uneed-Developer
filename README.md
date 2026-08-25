# Uneed Developer

Website portfolio + business untuk Uneed Developer, dan admin panel untuk
mengelolanya. Next.js 15 (App Router) + Tailwind CSS v4 + Prisma (SQLite) +
Auth.js v5.

## Stack

- **Next.js 15** (App Router, React 19, Server Actions)
- **Tailwind CSS v4** — semua token warna & tipografi lewat `@theme` di `app/globals.css`
- **Prisma 7 + SQLite** (`better-sqlite3` driver adapter) — database lokal, siap pindah ke Postgres
- **Auth.js v5** — login admin (Credentials + bcrypt)
- **Recharts** — chart di admin panel
- **Framer Motion** — animasi & transisi halaman

## Menjalankan project

```bash
npm install
cp .env.example .env   # isi DATABASE_URL & AUTH_SECRET sendiri
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Buka `http://localhost:3000` untuk situs publik, dan
`http://localhost:3000/admin-uneed/login` untuk admin panel.

`AUTH_SECRET` wajib diisi nilai random (`openssl rand -base64 32`) — jangan
pakai contoh dari `.env.example` apa adanya. Kredensial admin default dibuat
lewat `prisma/seed.ts` — cek file itu untuk email & password awal, lalu ganti
setelah login pertama kali.

## Struktur halaman

### Situs publik (`app/(site)/`)

Hero, Layanan, Portfolio, Kontak, Footer — semua data Layanan & Portfolio
diambil dari database (lewat `lib/public-data.ts`), bukan hardcoded, jadi
perubahan di admin panel langsung tampil di sini.

### Admin panel (`app/admin-uneed/`)

Diproteksi login (`/admin-uneed/login`), lalu:

| Halaman | Fungsi |
|---|---|
| Overview | Ringkasan revenue, project, tren pendapatan |
| Projects | CRUD project + klien |
| Pendapatan | CRUD transaksi (income/expense) + split per anggota tim |
| Tim | CRUD anggota tim, lihat pendapatan per anggota |
| Portfolio | CRUD portfolio yang tampil di situs publik — kategori terhubung ke Layanan lewat foreign key, dan gambar bisa diisi manual atau otomatis lewat "Ambil Screenshot" dari link website project |
| Layanan | CRUD kategori & paket layanan yang tampil di `/layanan` |
| Laporan | Ringkasan lengkap + export data (JSON) |
| Database | Backup/restore manual ke JSONBin (opsional) — lihat di bawah |

Mutasi data pakai Server Actions (`lib/admin/actions/`), bukan API routes
terpisah.

## Database

Prisma + SQLite (`dev.db`, di-gitignore) adalah sumber data utama. Skema ada
di `prisma/schema.prisma`, migrasi di `prisma/migrations/`.

Halaman **Database** di admin panel bisa dihubungkan ke bin JSONBin sebagai
backup cloud opsional untuk data Projects/Pendapatan/Tim (bukan sumber data
utama lagi) — Master Key & Bin ID diinput lewat halaman itu sendiri dan
disimpan di database lokal, tidak pernah lewat kode/README.

## Design tokens

Palet warna diambil langsung dari brand mark: circuit traces biru yang mengalir
jadi arrow hijau — "proses engineering mengalir jadi hasil/growth".

| Token         | Hex       | Pemakaian                          |
|---------------|-----------|-------------------------------------|
| `ink`         | `#060B14` | Background utama                    |
| `panel`       | `#0D1622` | Background card                     |
| `panel-line`  | `#17222F` | Border tipis, grid                  |
| `circuit`     | `#3B9EFF` | Aksen biru primer (proses/tech)     |
| `circuit-dim` | `#1C4E7D` | Border/aksen biru sekunder          |
| `growth`      | `#3DDC84` | Aksen hijau primer (hasil/CTA)      |
| `growth-dim`  | `#1F7A4E` | Aksen hijau sekunder                |
| `signal`      | `#CFFCE8` | Highlight terang, dipakai sangat jarang |
| `text-hi`     | `#EAF2FF` | Teks utama                          |
| `text-lo`     | `#7C8CA6` | Teks sekunder/muted                 |

Semua token didefinisikan di `app/globals.css` lewat `@theme`, jadi otomatis
tersedia sebagai utility class Tailwind (`bg-ink`, `text-circuit`, dst).

## Tipografi

- **Display** — Space Grotesk (`font-display`) — headline
- **Body** — Plus Jakarta Sans (`font-body`) — paragraf, deskripsi
- **Mono** — JetBrains Mono (`font-mono`) — label section, status, data

## Komponen dasar (`components/ui`)

- `Button` — variant `primary` / `secondary` / `ghost`
- `Card` — dipakai untuk grid layanan & portfolio
- `Container` — max-width wrapper konsisten
- `SectionLabel` — eyebrow label gaya komentar kode (`// layanan`)
- `SignalTrace` — elemen signature: garis vertikal dengan titik pulse,
  merepresentasikan alur circuit → growth dari logo

Lihat semua token & komponen dasar di `/design-system`.

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run start    # jalankan hasil build
npm run lint     # eslint
npx prisma studio         # GUI database lokal
npx prisma migrate dev    # migrasi setelah ubah schema.prisma
```
