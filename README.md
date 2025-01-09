Langkah-langkah untuk Menjalankan Proyek
Jalankan MySQL
Pastikan MySQL sudah berjalan di sistem Anda.

Clone Repository Aptavis
Clone repository aptavis ke komputer Anda menggunakan perintah berikut:

git clone [https://github.com/username/aptavis.git](https://github.com/ridwanherdiansah/aptavis-ridwan.git)
Masuk ke Folder Backend (be-aptavis)
Pindah ke folder backend be-aptavis:

cd be-aptavis
Install Dependensi dengan Composer
Jalankan perintah berikut untuk menginstall dependensi menggunakan Composer:

composer install
Tunggu hingga proses instalasi selesai dengan sukses.

Migrasi Database
Jalankan perintah berikut untuk menjalankan migrasi dan membuat tabel-tabel di database:

php artisan migrate
Seed Data ke Tabel Task dan Project
Untuk mengisi tabel tasks dan projects dengan data awal, jalankan perintah berikut:

php artisan migrate:fresh --seed
Jalankan Backend (be-aptavis)
Setelah semua dependensi terpasang dan migrasi selesai, jalankan server backend dengan perintah:

php artisan serve
Akses backend di http://localhost:8000.

Masuk ke Folder Frontend (fe-aptavis)
Pindah ke folder frontend fe-aptavis:

cd ../fe-aptavis
Buka File index.html di Browser
Buka file index.html yang ada di folder fe-aptavis dengan menggunakan browser pilihan Anda untuk melihat tampilan frontend.
