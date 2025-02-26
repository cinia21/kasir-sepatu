import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduk = () => {
    const { id } = useParams(); // Ambil ID produk dari URL
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [formData, setFormData] = useState({
        nama_produk: "",
        id_kategori: "",
        harga: "",
        deskripsi: "",
        file: null, // File baru jika diupload
        fileLama: "", // Untuk menyimpan gambar lama
    });

    const [kategori, setKategori] = useState([]);

    // Ambil data produk berdasarkan ID
    const getProduk = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/produk/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data produk");
            }

            const data = await response.json();
            setFormData({
                nama_produk: data.nama_produk,
                id_kategori: data.id_kategori,
                harga: data.harga,
                deskripsi: data.deskripsi,
                fileLama: data.file, // Simpan gambar lama
            });
        } catch (error) {
            console.error("Error fetching produk:", error);
            Swal.fire("Error!", "Gagal mengambil data produk!", "error");
        }
    };

    // Ambil daftar kategori
    const getKategori = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/kategori", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setKategori(data);
        } catch (error) {
            console.error("Error fetching kategori:", error);
        }
    };

    useEffect(() => {
        getProduk();
        getKategori();
    }, [id]);

    // Handle perubahan input
    const handleChange = (e) => {
        if (e.target.name === "file") {
            setFormData({ ...formData, file: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error!", "Token tidak ditemukan, silakan login ulang", "error");
            return;
        }

        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nama_produk", formData.nama_produk);
            formDataToSend.append("id_kategori", formData.id_kategori);
            formDataToSend.append("harga", formData.harga);
            formDataToSend.append("deskripsi", formData.deskripsi);

            // Jika ada gambar baru, gunakan gambar baru, jika tidak, tetap gunakan gambar lama
            if (formData.file) {
                formDataToSend.append("file", formData.file);
            } else {
                formDataToSend.append("fileLama", formData.fileLama);
            }

            const response = await fetch(`http://localhost:3000/api/produk/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error("Gagal mengupdate produk");
            }

            await response.json();
            Swal.fire("Sukses!", "Produk berhasil diperbarui!", "success");
            navigate("/admin/produk");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Edit Produk</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama Produk</label>
                    <input
                        type="text"
                        name="nama_produk"
                        className="form-control"
                        value={formData.nama_produk}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Kategori</label>
                    <select
                        name="id_kategori"
                        className="form-control"
                        onChange={handleChange}
                        value={formData.id_kategori}
                        required
                    >
                        <option value="">== Pilih Kategori ==</option>
                        {kategori.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.nama_kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        className="form-control"
                        value={formData.harga}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Deskripsi</label>
                    <input
                        type="text"
                        name="deskripsi"
                        className="form-control"
                        value={formData.deskripsi}
                        onChange={handleChange}
                        required
                    />
                </div>

        

                <div className="mb-3">
                    <label className="form-label">Gambar </label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={handleChange}
                        
                    />
                </div>

                <button type="submit" className="btn btn-primary"style={{backgroundColor:'#690B22'}}>
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
};

export default EditProduk;
