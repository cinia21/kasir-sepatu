import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Addkategori = () => {
    const [formData, setFormData] = useState({
        nama_kategori: "",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error!", "Kategori tidak ditemukan, silakan isi ulang", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/kategori/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan kategori");
            }

            await response.json();
            Swal.fire("Sukses!", "kategori berhasil ditambahkan", "success");
            navigate("/admin/kategori");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Tambah Kategori</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">nama_kategori</label>
                    <input
                        type="text"
                        name="nama_kategori"
                        className="form-control"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                    />
                </div>


                <button type="submit" className="btn btn-primary "style={{backgroundColor:'#690B22'}}>
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default Addkategori;
