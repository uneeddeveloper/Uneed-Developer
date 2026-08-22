# Uneed Developer

Portfolio + business site untuk Uneed Developer. Next.js 15 (App Router) + Tailwind CSS v4.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka `http://localhost:3000` untuk home page, dan `http://localhost:3000/design-system`
untuk lihat semua token & komponen dasar.

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
  merepresentasikan alur circuit → growth dari logo. Rencana pemakaian:
  berjalan di margin kiri menyambungkan Hero → Layanan → Portfolio → Kontak.

## Langkah berikutnya

1. Landing page client (Hero, Layanan, Portfolio, Kontak, Footer)
2. Prisma schema + migrasi dari JSONBin ke Postgres
3. Admin panel (Overview, Projects, Pendapatan, Tim, Portfolio, Laporan) + auth
