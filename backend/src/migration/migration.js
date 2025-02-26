const mysql = require("mysql2");
const konekMysql = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
});

const createUserTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama varchar(100),
        username varchar(100),
        password varchar(100),
        role ENUM('admin','kasir'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table user", err.stack);
            return;
        }
        console.log("table user berhasil di buat");
    });
};

const createKategoriTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS kategori (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_kategori varchar(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table kategori", err.stack);
            return;
        }
        console.log("table kategori berhasil di buat");
    });
};

const createProdukTable = (koneksi) => {
    const q = `create TABLE IF NOT EXISTS produk (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_produk VARCHAR(100),
        id_kategori INT,
        harga DECIMAL(10,2),
        deskripsi VARCHAR(100),
        file text,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL
       )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table produk", err.stack);
            return;
        }
        console.log("table produk berhasil di buat");
    });
};

const createPelangganTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS pelanggan (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama_pelanggan VARCHAR(100),
        alamat VARCHAR(100),
        no_hp VARCHAR(15),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        deleted_at DATETIME NULL
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table pelanggan", err.stack);
            return;
        }
        console.log("table pelanggan berhasil dibuat");
    });
};

const createTransaksiTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS transaksi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_user INT NOT NULL,
        id_pelanggan INT NOT NULL,
        total_harga DECIMAL(10,2) NOT NULL,
        kembalian DECIMAL(10,2) NOT NULL,
        tanggal_transaksi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_user) REFERENCES user(id) ON DELETE CASCADE,
        FOREIGN KEY (id_pelanggan) REFERENCES pelanggan(id) ON DELETE CASCADE
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table transaksi", err.stack);
            return;
        }
        console.log("table transaksi berhasil dibuat");
    });
};

const createDetailtransaksiTable = (koneksi) => {
    const q = `CREATE TABLE IF NOT EXISTS detailtransaksi (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_transaksi int,
        id_produk int,
        jumlah int,
        harga_satuan DECIMAL(10,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    koneksi.query(q, (err, result) => {
        if (err) {
            console.error("error buat table detailtransaksi", err.stack);
            return;
        }
        console.log("table detailtransaksi berhasil dibuat");
    });
};


const migration = () => {
    konekMysql.connect((err) => {
        if (err) {
            console.error("Error koneksi ke database", err.stack);
            return;
        }
        console.log("berhasil konek mysql");
        konekMysql.query(
            "CREATE DATABASE IF NOT EXISTS toko_sepatu",
            (err, result) => {
                if (err) {
                    console.error("Error membuat database", err.stack);
                    return;
                }  
                console.log("Database berhasil dibuat atau sudah ada.");

                const koneksi = require("../models/db");
                createUserTable(koneksi);
                createKategoriTable(koneksi);
                createProdukTable(koneksi);
                createPelangganTable(koneksi);
                createTransaksiTable(koneksi);
                createDetailtransaksiTable(koneksi);

                konekMysql.end();
            }
        );
    });
};

module.exports = migration;