import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Transaksi = () => {
    const [dataTransaksi, setTransaksi] = useState([]);
    const [dataPelanggan, setPelanggan] = useState([]);
    const [dataUser, setUser] = useState([]);
    const [dataProduk, setProduk] = useState([]);
    const token = localStorage.getItem("token");

    // Ambil Data Transaksi
    const tampilData = async () => {
        if (!token) {
            Swal.fire("Error!", "Token tidak ditemukan. Silakan login ulang.", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/transaksi/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setTransaksi(data);
        } catch (error) {
            console.error("Error fetching data transaksi:", error);
        }
    };

    // Ambil Data Pelanggan
    const tampilPelanggan = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/pelanggan/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPelanggan(data);
        } catch (error) {
            console.error("Error fetching data pelanggan:", error);
        }
    };

    // Ambil Data User
    const tampilUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error fetching data user:", error);
        }
    };

    // Ambil Data Produk
    const tampilProduk = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/produk/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setProduk(data);
        } catch (error) {
            console.error("Error fetching data produk:", error);
        }
    };

    useEffect(() => {
        tampilData();
        tampilPelanggan();
        tampilUser();
        tampilProduk();
    }, []);

    // Temukan Nama Pelanggan Berdasarkan pelanggan_id
    const getNamaPelanggan = (id) => {
        const pelanggan = dataPelanggan.find((p) => p.id === id);
        return pelanggan ? pelanggan.nama_pelanggan : "Tidak Ditemukan";
    };

    // Temukan Nama User Berdasarkan user_id
    const getNamaUser = (id) => {
        const user = dataUser.find((u) => u.id === id);
        return user ? user.nama : "Tidak Ditemukan";
    };

    // Temukan Nama Produk Berdasarkan produk_id
    const getNamaProduk = (id) => {
        const produk = dataProduk.find((p) => p.id === id);
        return produk ? produk.nama_produk : "Tidak Ditemukan";
    };

    const formatTanggal = (tanggal) => {
        const date = new Date(tanggal);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
        });
    };

    // Hapus Transaksi
    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/transaksi/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        setTransaksi(dataTransaksi.filter((transaksi) => transaksi.id !== id));
                        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error!", "Terjadi kesalahan saat menghapus data.", "error");
                    });
            }
        });
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">DATA TRANSAKSI</h1>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex justify-content-end mb-3">
                                        <Link
                                            to="/admin/addtransaksi"
                                            className="btn btn-lg"
                                            style={{ borderRadius: 5, background: "#690B22", color: "white" }}
                                        >
                                            <i className="fas fa-plus me-2" />
                                            Tambah Transaksi
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead>
                                            <tr style={{ backgroundColor: '#E17564', color: "white" }}>
                                                    <th>ID</th>
                                                    <th>User</th>
                                                    <th>Pelanggan</th>
                                                    <th>Produk</th>
                                                    <th>Harga Satuan</th>
                                                    <th>Jumlah</th>
                                                    <th>Total Harga</th>
                                                    <th>Kembalian</th>
                                                    <th>Tanggal Transaksi</th>
                                                    
                                                    <th>Hapus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataTransaksi.length > 0 ? (
                                                    dataTransaksi.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{getNamaUser(item.id_user)}</td>
                                                            <td>{getNamaPelanggan(item.id_pelanggan)}</td>
                                                            <td>{getNamaProduk(item.id_produk)}</td>
                                                            <td>{item.harga_satuan}</td>
                                                            <td>{item.jumlah}</td>
                                                            <td>{item.total_harga}</td>
                                                            <td>{item.kembalian}</td>
                                                            <td>{formatTanggal(item.tanggal_transaksi)}</td>
                                                           
                                                            <td>
                                                                <button
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="btn btn-sm btn-danger"
                                                                >
                                                                    <i className="fas fa-trash" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="11">Data Kosong</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Transaksi;
