## Dokumentasi Endpoint Gacha

Daftar endpoint yang bisa diakses untuk sistem undian gacha:

1. **Gacha**

   - **URL:** `POST /api/gacha/play`
   - **Body (JSON):** `{ "user_name": "Nama User" }`
   - **Fungsi:** Mengeksekusi undian, sesuai ketentuan hanya bisa dilakukan maksimal 5x sehari per user, mengembalikan response hadiah jika menang, atau zonk jika kalah/kuota habis

2. **Melihat Histori Gacha User (Bonus 1)**

   - **URL:** `GET /api/gacha/history?user_name=Nama User`
   - **Query Parameter:** `user_name`
   - **Fungsi:** Menampilkan seluruh riwayat gacha yang pernah dilakukan oleh user tertentu beserta hadiahnya

3. **Melihat Kuota Hadiah (Bonus 2)**

   - **URL:** `GET /api/gacha/prizes`
   - **Fungsi:** Menampilkan daftar semua hadiahnya, kuota awal, dan sisa kuota yang tersedia saat ini

4. **Melihat Daftar Pemenang (Bonus 3)**
   - **URL:** `GET /api/gacha/winners`
   - **Fungsi:** Menampilkan daftar nama user yang telah memenangkan setiap kategori hadiah, Nama usernya disamarin untuk menjaga privasi sesuai ketentuan
