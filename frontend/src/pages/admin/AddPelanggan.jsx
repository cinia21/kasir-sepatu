import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddPelanggan = () => {
    const [formData, setFormData] = useState({
        nama_pelanggan: "",
        alamat: "",
        no_hp: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error!", "pelanggan tidak ditemukan, silakan isi ulang", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/pelanggan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan pelanggan");
            }

            await response.json();
            Swal.fire("Sukses!", "pelanggan berhasil ditambahkan", "success");
            navigate("/admin/pelanggan");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Tambah Pelanggan</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">nama_pelanggan</label>
                    <input
                        type="text"
                        name="nama_pelanggan"
                        className="form-control"
                        value={formData.nama_pelanggan}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Alamat</label>
                    <input
                        type="text"
                        name="alamat"
                        className="form-control"
                        value={formData.alamat}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">no_hp</label>
                    <input
                        type="text"
                        name="no_hp"
                        className="form-control"
                        value={formData.no_hp}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button type="submit" className="btn btn-primary" style={{backgroundColor:'#690B22'}}>
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default AddPelanggan;
