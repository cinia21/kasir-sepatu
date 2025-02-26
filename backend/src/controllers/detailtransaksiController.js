const detailtransaksi = require("../models/detailtransaksi");

const index = (req, res) => {
    detailtransaksi.selectdetailtransaksi((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "detail transaksi tidak ditemukan"
            })

        }
        res.status(200).json(result)
    })
}
const storedetailtransaksi = (req, res) => {
    const {id_transaksi, id_produk, jumlah, harga_satuan} = req.body;
    detailtransaksi.insertdetailtransaksi( id_transaksi, id_produk, jumlah, harga_satuan, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res
            .status(201)
            .json({ message: "Berhasil disimpan", detailtransaksiId: result.insertId });
    });
};
const showdetailransaksi = (req, res) => {
    const { id } = req.params;
    detailtransaksi.selectdetailtransaksiById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: " detail transaksi tidak ditemukan" });
        }
        res.status(200).json(result[0]);
    });
};

const destroydetailtransaksi = (req, res) => {
    const { id } = req.params;
    detailtransaksi.deleteddetailtransaksi(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "detail transaksi berhasil di hapus" });
    });
};
module.exports = { index, showdetailransaksi, storedetailtransaksi,destroydetailtransaksi, };