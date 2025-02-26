const transaksi = require("../models/transaksi");
const detailtransaksi = require("../models/detailtransaksi")

const index = (req, res) => {
    transaksi.selectTransaksi((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "transaksi tidak ditemukan"
            })

        }
        res.status(200).json(result)
    })
}
const storeTransaksi = (req, res) => {
    const { id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, id_produk, jumlah, harga_satuan } = req.body;
    console.log(req.body);
    
    transaksi.insertTransaksi(id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        detailtransaksi.insertdetailtransaksi(result.insertId, id_produk, jumlah, harga_satuan, (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({ message: "Berhasil disimpan", transaksiId: result.insertId });
        });
    });
};

const showTransaksi = (req, res) => {
    const { id } = req.params;
    transaksi.selectTransaksiById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "transaksi tidak ditemukan" });
        }
        res.status(200).json(result[0]);
    });
};
const updateTransaksi = (req, res) => {
    const { id } = req.params;
    const { id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi } = req.body;
    transaksi.updateTransaksi(id, id_user, id_pelanggan, total_harga, kembalian, tanggal_transaksi, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("berhasil mengubah");
    });
};
const destroyTransaksi = (req, res) => {
    const { id } = req.params;
    transaksi.deleteTransaksi(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ message: "transaksi berhasil di hapus" });
    });
};

module.exports = { index, showTransaksi, storeTransaksi, updateTransaksi, destroyTransaksi };