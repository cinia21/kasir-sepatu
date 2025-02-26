const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const kategoriController = require("../controllers/kategoriController")
const produkController = require("../controllers/produkController")
const pelangganController = require("../controllers/pelangganController")
const transaksiController = require("../controllers/transaksiController")
const detailtransaksiController = require("../controllers/detailtransaksiController")
const authJWT = require("../middleware/authMiddleware");

router.get("/users",authJWT, userController.index);
router.post("/users", userController.storeUser);
router.get("/users/:id",authJWT, userController.showUser);
router.put("/users/:id",authJWT, userController.updateUser);
router.delete("/users/:id",authJWT, userController.destoryUser);
router.post("/login",userController.login);

router.get("/kategori", kategoriController.index);
router.post("/kategori", kategoriController.storekategori);
router.get("/kategori/:id", kategoriController.showkategori);
router.put("/kategori/:id", kategoriController.updatekategori);
router.delete("/kategori/:id", kategoriController.destorykategori);

router.get("/produk", produkController.index);
router.post("/produk", produkController.upload.single("file"), produkController.storeProduk);
router.get("/produk/:id", produkController.showProduk);
router.put("/produk/:id", produkController.upload.single("file"), produkController.updateProduk);
router.delete("/produk/:id", produkController.destroyProduk);

router.get("/pelanggan", pelangganController.index);
router.post("/pelanggan", pelangganController.storePelanggan);
router.get("/pelanggan/:id", pelangganController.showPelanggan);
router.put("/pelanggan/:id", pelangganController.updatePelanggan);
router.delete("/pelanggan/:id", pelangganController.destoryPelanggan);

router.get("/transaksi", transaksiController.index);
router.post("/transaksi", transaksiController.storeTransaksi);
router.get("/transaksi/:id", transaksiController.showTransaksi);
router.put("/transaksi/:id", transaksiController.updateTransaksi);
router.delete("/transaksi/:id", transaksiController.destroyTransaksi);

router.get("/detailtransaksi", detailtransaksiController.index);
router.post("/detailtransaksi", detailtransaksiController.storedetailtransaksi);
router.get("/detailtransaksi/:id", detailtransaksiController.showdetailransaksi);
router.delete("/detailtransaksi/:id", detailtransaksiController.destroydetailtransaksi);

module.exports = router