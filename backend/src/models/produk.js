const koneksi = require("./db");

// Menampilkan semua produk
const selectProduk = (callback) => {
    const q = "SELECT * FROM produk WHERE deleted_at IS NULL";
    koneksi.query(q, callback);
};

// Menambahkan produk baru
const insertProduk = (nama_produk, id_kategori, harga, deskripsi, file, callback) => {
    const q = "INSERT INTO produk (nama_produk, id_kategori, harga, deskripsi, file) VALUES (?, ?, ?, ?, ?)";
    koneksi.query(q, [nama_produk, id_kategori, harga, deskripsi, file], callback);
};

// Mengupdate produk berdasarkan ID
const updateProduk = (id, nama_produk, id_kategori, harga, deskripsi, file, callback) => {
    const q = "UPDATE produk SET nama_produk = ?, id_kategori = ?, harga = ?, deskripsi = ?, file = ? WHERE id = ?";
    koneksi.query(q, [nama_produk, id_kategori, harga, deskripsi, file, id], callback);
};

// Menampilkan produk berdasarkan ID
const selectProdukById = (id, callback) => {
    const q = "SELECT * FROM produk WHERE id = ? AND deleted_at IS NULL";
    koneksi.query(q, [id], callback);
};

// Menghapus produk (Soft Delete)
const deleteProduk = (id, callback) => {
    const q = "UPDATE produk SET deleted_at = NOW() WHERE id = ?";
    koneksi.query(q, [id], callback);
};

module.exports = { selectProduk, insertProduk, updateProduk, selectProdukById, deleteProduk };
