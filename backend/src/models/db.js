const mysql = require("mysql2");
const koneksi = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",  
    database: "toko_sepatu",
});
koneksi.connect((err) => {
    if (err) {
        console.error("Error koneksi ke database", err.stack);
        return;
    }
    console.log("Berhasil koneksi ke database toko_sepatu");
});
module.exports = koneksi;