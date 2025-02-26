const koneksi = require("./db");

const selectdetailtransaksi = (callback) => {
    const q = "SELECT * FROM detailtransaksi";
    koneksi.query(q, callback);
};

const insertdetailtransaksi = ( id_transaksi, id_produk, jumlah, harga_satuan, callback) => {
    const q = "INSERT INTO detailtransaksi (id_transaksi, id_produk, jumlah, harga_satuan) VALUES(?,?,?,?)";
    koneksi.query(q, [id_transaksi, id_produk, jumlah, harga_satuan], callback);
};

const selectdetailtransaksiById = (id, callback) => {
    const q = "SELECT * FROM detailtransaksi where id=? AND deleted_at IS NULL";
    koneksi.query(q[id], callback);
}

const deleteddetailtransaksi = (id, callback) => {
    const q = "DELETE FROM detailtransaksi WHERE id= ?";
    koneksi.query(q, [id], callback);
};

module.exports = { selectdetailtransaksi, insertdetailtransaksi, selectdetailtransaksiById, deleteddetailtransaksi };