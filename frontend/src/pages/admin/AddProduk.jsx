import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddProduk = () => {
    const [formData, setFormData] = useState({
        nama_produk: "",
        id_kategori: "",
        harga: "",
        deskripsi: "",
        file: null, // Perbaiki dari "File" menjadi "file"
    });

    const [kategori, setKategori] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Mengambil data kategori dari API
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
        getKategori();
    }, []);

    // Handle perubahan input
    const handleChange = (e) => {
        if (e.target.name === "file") {
            setFormData({ ...formData, file: e.target.files[0] }); // Menggunakan e.target.files[0] untuk file
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    // Handle submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error!", "Produk tidak ditemukan, silakan isi ulang", "error");
            return;
        }

        try {
            // Gunakan FormData() untuk mengirim file
            const formDataToSend = new FormData();
            formDataToSend.append("nama_produk", formData.nama_produk);
            formDataToSend.append("id_kategori", formData.id_kategori);
            formDataToSend.append("harga", formData.harga);
            formDataToSend.append("deskripsi", formData.deskripsi);
            formDataToSend.append("file", formData.file); // Tambahkan file

            const response = await fetch("http://localhost:3000/api/produk", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`, // Jangan tambahkan "Content-Type", FormData akan otomatis menentukannya
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan Produk");
            }

            await response.json();
            Swal.fire("Sukses!", "Produk berhasil ditambahkan", "success");
            navigate("/admin/produk");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Tambah Produk</b></h2>
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
                        type="number" // Perbaikan dari "decimal(10,2)" ke "number"
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
                    <label className="form-label">Gambar</label>
                    <input
                        type="file"
                        name="file"
                        className="form-control"
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

export default AddProduk;
