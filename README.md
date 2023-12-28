### ToDoList API
1. Instalasi <br>
Clone repositori ini ke dalam direktori lokal <br>
Instal dependencies menggunakan npm<br>
Sesuaikan konfigurasi database dan informasi lainnya di dalam berkas .env. <br>

2. Penggunaan <br>
Jalankan migrasi untuk membuat tabel di database<br>
Aplikasi akan berjalan pada http://localhost:3000. <br><br>

3. Endpoints (menggunakan POSTMENT) <br> 
<b> a. Registrasi Pengguna</b> <br>
Method: POST <br>
Endpoint: /register <br>
<b> b. Masuk (Login) Pengguna: </b> <br>
Method: POST <br>
Endpoint: /login  <br>
<b> c. Membuat Item ToDo Baru: </b> <br>
Method: POST<br>
Endpoint: /todos<br>
<b> d. Mendapatkan Semua Item ToDo: </b><br>
Method: GET <br>
Endpoint: /todos <br>
<b> e. Mendapatkan Item ToDo berdasarkan ID: </b> <br>
Method: GET <br>
Endpoint: /todos/:id <br>
<b> f. Memperbarui Item ToDo berdasarkan ID:<b><br>
Method: PUT<br>
Endpoint: /todos/:id <br>
<b> g. Menghapus Item ToDo berdasarkan ID:</b><br>
Method: DELETE <br>
Endpoint: /todos/:id <br>
<b> h. Menghapus Semua Item ToDo:</b> <br>
Method: DELETE <br>
Endpoint: /todos <br>
