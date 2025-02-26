const koneksi = require("./db");

const selectPelanggan= (callback) => {
    const q = "SELECT * FROM pelanggan";
    koneksi.query(q, callback);
};

const insertPelanggan = (nama_pelanggan, alamat, no_hp, callback) => {
    const q = "INSERT INTO pelanggan(nama_pelanggan, alamat, no_hp ) VALUES(?,?,?) ";
    koneksi.query(q, [nama_pelanggan, alamat, no_hp ], callback);
};

const updatePelanggan =(id, nama_pelanggan, alamat, no_hp, callback) => {
    const q = "UPDATE pelanggan set nama_pelanggan = ?, alamat = ?, no_hp = ? where id = ?";
    koneksi.query(q, [nama_pelanggan, alamat, no_hp, id], callback);
};

const selectPelangganById = (id, callback) => {
    const q = "SELECT * FROM pelanggan where id=? AND deleted_at IS NULL";
    koneksi.query(q, [id], callback);
};  

const deletePelanggan = (id, callback) => {
    const q = "DELETE FROM pelanggan where id =?";
    koneksi.query(q, [id], callback);
};

module.exports={selectPelanggan, insertPelanggan, updatePelanggan, selectPelangganById, deletePelanggan}