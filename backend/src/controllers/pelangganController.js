const pelanggan = require("../models/pelanggan");
const { updateProduk } = require("./produkController");

const index=(req,res)=>{
    pelanggan.selectPelanggan((err, result)=>{
        if (err)
        {
            return res.status(500).json({error:err.message})
        }
        if (result.length===0)
        {
            return res.status(404).json({
                message:"pelanggan tidak ditemukan"
            });
        };
        res.status(200).json(result)
    })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
}
const storePelanggan = (req, res) => {
    const { nama_pelanggan, alamat, no_hp } = req.body;
    pelanggan.insertPelanggan(nama_pelanggan, alamat, no_hp, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res
            .status(201).json({ message: "pelanggan disimpan", pelangganId: result.insertId });
    });
};
    const showPelanggan = (req, res) => {
        const { id } = req.params;
        pelanggan.selectPelangganById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message});
            }
            if (result.length === 0){
                return res.status(400).json({ message: "pelanggan kosong" });
            }
            res.status(200).json(result[0]);
        });
    };
    const updatePelanggan = (req, res) => {
        const { id } = req.params;
        const { nama_pelanggan,alamat,no_hp, } = req.body;
        pelanggan.updatePelanggan(id, nama_pelanggan,alamat,no_hp, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json("berhasil mengubah");
        });
    };
    const destoryPelanggan = (req, res) => {
        const { id } = req.params;
        pelanggan.deletePelanggan(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json("pelanggan berhasil dihapus");
        });
    };
    module.exports ={index,storePelanggan,showPelanggan,updatePelanggan,destoryPelanggan};