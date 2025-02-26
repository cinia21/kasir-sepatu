const produk = require("../models/produk");
const multer = require("multer");
const path = require("path");

const index = (req, res) => {
    produk.selectProduk((err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "produk tidak ditemukan" });
        }
        res.status(200).json(result);
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/files");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const storeProduk = (req, res) => {
    const { nama_produk, nama_kategori, harga, deskripsi } = req.body;
    const file = req.file ? req.file.filename : null;
    
    produk.insertProduk(nama_produk, nama_kategori, harga, deskripsi, file, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: "produk disimpan", produkId: result.insertId });
    });
};

const showProduk = (req, res) => {
    const { id } = req.params;
    produk.selectProdukById(id, (err, result) => { 
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: "produk kosong" });
        }
        res.status(200).json(result[0]);
    });
};

const updateProduk = (req, res) => {
    const { id } = req.params;
    const { nama_produk, nama_kategori, harga, deskripsi } = req.body;
    const file = req.file ? req.file.filename : req.body.file_lama; 

    produk.updateProduk(id, nama_produk, nama_kategori, harga, deskripsi, file, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("berhasil mengubah");
    });
};

const destroyProduk = (req, res) => { 
    const { id } = req.params;
    produk.deleteProduk(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("produk berhasil dihapus");
    });
};

const upload = multer({ storage: storage });

const storeFileProduk = (req, res) => {
    const { nama_produk, nama_kategori, harga, deskripsi,file } = req.body; 
    if (!req.file) {
        return res.status(400).json({ error: "gambar tidak boleh kosong" });
    }

    produk.insertProduk(nama_produk, nama_kategori, harga, deskripsi,file,  req.file.filename, (err, result) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json("Upload berhasil");
    });
};

module.exports = { index, storeProduk, showProduk, updateProduk, destroyProduk, storeFileProduk, upload};
