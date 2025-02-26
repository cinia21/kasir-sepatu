const koneksi = require("./db");

const selectkategori = (callback) => {
    const q = "SELECT * FROM kategori";
    koneksi.query(q, callback);
};

const insertkategori = (nama_kategori, callback) => {
        const q = "INSERT INTO kategori(nama_kategori) VALUES(?) ";
        koneksi.query(q, [nama_kategori], callback);
};

const updatekategori =(id, nama_kategori, callback) => {
    const q = "UPDATE kategori set nama_kategori=? where id = ?";
    koneksi.query(q, [nama_kategori, id], callback);
};

const selectkategoriById = (id, callback) => {
    const q = "SELECT * FROM kategori where id=?";
    koneksi.query(q, [id], callback);
};  

const deletekategori = (id, callback) => {
    const q = "DELETE FROM kategori where id =?";
    koneksi.query(q, [id], callback);
};
module.exports= {selectkategori, insertkategori, selectkategoriById, updatekategori, deletekategori}