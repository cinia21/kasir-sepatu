const User = require("../models/user");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcryptjs");

const index =(req,res)=>{
    User.selectUsers((err, result)=>{
        if (err)
        {
            return res.status(500).json({error:err.message})
        }
        if (result.length===0)
        {
            return res.status(404).json({
                message:"user kosong"
            })

        }
        res.status(200).json(result)
    })
}
const storeUser = (req, res) => {
    const { nama, username, password, role } = req.body;
    User.insertUser(nama, username, password, role, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        res
            .status(201)
            .json({ message: "Berhasil disimpan", userId: result.insertId });
    });
};
const showUser = (req, res) => {
    const { id } = req.params;
    User.selectUserById(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message});
        }
        if (result.length === 0){
            return res.status(400).json({ message: "user ndak ada" });
        }
        res.status(200).json(result[0]);
    });
};
const updateUser = (req, res) => {
    const { id } = req.params;
    const { nama, username, password,role } = req.body;
    User.updateUser(id,nama,username,password,role, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("data berhasil dirubah");
    });
};
const destoryUser = (req, res) => {
    const { id } = req.params;
    User.deleteUser(id, (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json("data berhasil dihapus");
    });
};

const login = async (req, res) => {
    const { username, password } = req.body;
    
    User.selectUsersByUsername(username, async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Pastikan result tidak kosong sebelum mengakses result[0]
        if (!result || result.length === 0) {
            return res.status(404).json({ message: "Username salah" });
        }

        const user = result[0]; // Data user dari database

        try {
            // Pastikan user.password tidak undefined sebelum membandingkan
            if (!user.password) {
                return res.status(500).json({ message: "Terjadi kesalahan pada data pengguna" });
            }

            // Menggunakan bcrypt.compare (versi asinkron)
            const passwordIsValid = await bcrypt.compare(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).json({ message: "Password salah" });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "123", {
                expiresIn: 86400,  // 24 jam
            });

            return res.status(200).json({ auth: true, token });
        } catch (error) {
            return res.status(500).json({ error: "Terjadi kesalahan saat memverifikasi password" });
        }
    });
};

module.exports ={index,storeUser,showUser,updateUser,destoryUser,login} 