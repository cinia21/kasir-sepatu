const koneksi = require("./db");

const selectTransaksi= (callback) => {
    const q = "SELECT transaksi.*,detailtransaksi.*,produk.nama_produk FROM transaksi,detailtransaksi,produk WHERE transaksi.id=detailtransaksi.id_transaksi AND detailtransaksi.id_produk=produk.id";
    koneksi.query(q, callback);
};

const insertTransaksi = (id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, callback) => {
    const q = "INSERT INTO transaksi(id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi ) VALUES(?,?,?,?,?) ";
    koneksi.query(q, [id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi ], callback);
};

const updateTransaksi =(id, id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, callback) => {
    const q = "UPDATE pelanggan set id_user = ?, id_pelanggan = ?, total_harga = ?, kembalian = ?, tanggal_transaksi = ? where id = ?";
    koneksi.query(q, [id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, id], callback);
};

const selectTransaksiById = (id, callback) => {
    const q = "SELECT * FROM transaksi where id=? AND deleted_at IS NULL";
    koneksi.query(q, [id], callback);
};  

const deleteTransaksi = (id, callback) => {
    const q = "DELETE FROM transaksi where id =?";
    koneksi.query(q, [id], callback);
};

module.exports={selectTransaksi, insertTransaksi, updateTransaksi, selectTransaksiById, deleteTransaksi}