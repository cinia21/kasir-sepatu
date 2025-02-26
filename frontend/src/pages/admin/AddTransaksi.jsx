import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddTransaksi = () => {
    const [dataPelanggan, setPelanggan] = useState([]);
    const [dataUser, setUser] = useState([]);
    const [dataProduk, setProduk] = useState([]);
    const [formData, setFormData] = useState({
        id_user: "",
        id_pelanggan: "",
        id_produk: "",
        harga_satuan: "",
        jumlah: "",
        total_harga: "",
        kembalian: "",
        tanggal_transaksi: new Date().toISOString().slice(0, 10), // Default tanggal hari ini
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // Validasi token sebelum memuat halaman
    useEffect(() => {
        if (!token) {
            Swal.fire("Error!", "Token tidak ditemukan. Silakan login ulang.", "error");
            navigate("/login");
        }
    }, [token, navigate]);

    // Ambil data pelanggan dari API
    const getPelanggan = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/pelanggan", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Gagal mengambil data pelanggan");

            const data = await response.json();
            setPelanggan(data);
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    // Ambil data user dari API
    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Gagal mengambil data user");

            const data = await response.json();
            setUser(data);
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    // Ambil data produk dari API
    const getProduk = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/produk", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) throw new Error("Gagal mengambil data produk");

            const data = await response.json();
            setProduk(data);
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    // Jalankan saat komponen dimuat
    useEffect(() => {
        getPelanggan();
        getUser();
        getProduk();
    }, []);

    // Menangkap perubahan input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        // Konversi ke angka jika input angka
        if (["harga_satuan", "jumlah", "total_harga", "kembalian"].includes(name)) {
            updatedValue = value ? Number(value) : "";
        }

        setFormData({ ...formData, [name]: updatedValue });
    };

    // Saat produk dipilih, harga satuan diambil dari data produk
    const handleProductChange = (e) => {
        const selectedProductId = e.target.value;
        const selectedProduct = dataProduk.find((item) => item.id.toString() === selectedProductId);

        if (selectedProduct) {
            setFormData({
                ...formData,
                id_produk: selectedProductId,
                harga_satuan: selectedProduct.harga, // Ambil harga produk dari database
                total_harga: formData.jumlah ? selectedProduct.harga * formData.jumlah : 0, // Hitung total harga jika jumlah sudah ada
            });
        }
    };

    // Hitung total harga otomatis saat jumlah berubah
    useEffect(() => {
        if (formData.harga_satuan && formData.jumlah) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                total_harga: prevFormData.harga_satuan * prevFormData.jumlah,
            }));
        }
    }, [formData.harga_satuan, formData.jumlah]);

    // Menangani submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Data yang dikirim:", formData); // Debugging sebelum validasi

        // Validasi input
        const requiredFields = ["id_user", "id_pelanggan", "id_produk", "harga_satuan", "jumlah", "total_harga"];
        const isFormValid = requiredFields.every((field) => formData[field]);

        if (!isFormValid) {
            Swal.fire("Error!", "Semua bidang wajib diisi.", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/transaksi", {
                method: "POST",    
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || "Gagal menambahkan transaksi");
            }

            Swal.fire("Sukses!", "Transaksi berhasil ditambahkan", "success");
            navigate("/admin/transaksi");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Tambah Transaksi</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">User</label>
                    <select name="id_user" className="form-control" onChange={handleChange} value={formData.id_user} required>
                        <option value="">== Pilih User ==</option>
                        {dataUser.map((item) => (
                            <option key={item.id} value={item.id}>{item.nama}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Pelanggan</label>
                    <select name="id_pelanggan" className="form-control" onChange={handleChange} value={formData.id_pelanggan} required>
                        <option value="">== Pilih Pelanggan ==</option>
                        {dataPelanggan.map((item) => (
                            <option key={item.id} value={item.id}>{item.nama_pelanggan}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Produk</label>
                    <select name="id_produk" className="form-control" onChange={handleProductChange} value={formData.id_produk} required>
                        <option value="">== Pilih Produk ==</option>
                        {dataProduk.map((item) => (
                            <option key={item.id} value={item.id}>{item.nama_produk}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Harga Satuan</label>
                    <input type="number" name="harga_satuan" className="form-control" value={formData.harga_satuan} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">Jumlah</label>
                    <input type="number" name="jumlah" className="form-control" value={formData.jumlah} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Total Harga</label>
                    <input type="number" name="total_harga" className="form-control" value={formData.total_harga} readOnly />
                </div>

                <div className="mb-3">
                    <label className="form-label">kembalian</label>
                    <input type="number" name="kembalian" className="form-control" value={formData.kembalian} onChange={handleChange} required />
                </div>

                <div className="text-end">
                    <button type="submit" className="btn btn-primary"style={{backgroundColor:'#690B22'}}>Simpan</button>
                </div>
            </form>
        </div>
    );
};

export default AddTransaksi;
