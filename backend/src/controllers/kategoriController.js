const kategori = require("../models/kategori");

const index=(req,res)=>{
    kategori.selectkategori((err, result)=>{
        if (err)
        {
            return res.status(500).json({error:err.message})
        }
        if (result.length === 0)
            {
                return res.status(404).json({message:"kategori kosong"})
            }
            res.status(200).json(result)
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    }
    const storekategori = (req, res) => {
        const { nama_kategori } = req.body;
        kategori.insertkategori(nama_kategori, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message })
            }
            res
                .status(200).json({ message: "berhasil disimpan", kategoriId: result.insertId });
        })
    };
    const showkategori = (req, res) => {
        const { id } = req.params;
        kategori.selectkategoriById(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message});
            }
            if (result.length === 0){
                return res.status(400).json({ message: "kategori kosong" });
            }
            res.status(200).json(result[0]);
        });
    };
    const updatekategori = (req, res) => {
        const { id } = req.params;
        const { nama_kategori } = req.body;
        kategori.updatekategori(id, nama_kategori, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json("berhasil mengubah");
        });
    };
    const destorykategori = (req, res) => {
        const { id } = req.params;
        kategori.deletekategori(id, (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(200).json("kategori berhasil dihapus");
        });
    };
    module.exports ={index,storekategori,showkategori,updatekategori,destorykategori};