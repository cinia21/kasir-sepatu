import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";

const Produk = () => {
    const [dataProduk, setProduk] = useState([]);
    const token = localStorage.getItem("token");

    // Fungsi untuk menampilkan data produk
    const tampilData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/produk", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data produk");
            }

            const data = await response.json();
            setProduk(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire("Error!", "Gagal mengambil data produk!", "error");
        }
    };

    useEffect(() => {
        tampilData();
    }, []);

    // Fungsi untuk menghapus produk
    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/produk/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Gagal menghapus produk");
                        }
                        return response.json();
                    })
                    .then(() => {
                        setProduk((prevData) => prevData.filter((item) => item.id !== id));
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
                            <h1 className="m-0">Data Produk</h1>
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
                                            to="/admin/addproduk"
                                            className="btn btn-lg"
                                            style={{
                                                borderRadius: 5,
                                                background: "#690B22",
                                                color: "white",
                                            }}
                                        >
                                            <i className="fas fa-plus me-2" />
                                            Tambah Produk
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead>
                                            <tr style={{ backgroundColor: '#E17564', color: "white" }}>
                                                    <th>ID</th>
                                                    <th>Nama Produk</th>
                                                    <th>Kategori</th>
                                                    <th>Harga</th>
                                                    <th>Deskripsi</th>
                                                    <th>Gambar</th>
                                                    <th>Edit</th>
                                                    <th>Hapus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataProduk.length > 0 ? (
                                                    dataProduk.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama_produk}</td>
                                                            <td>{item.id_kategori}</td>
                                                            <td>{item.harga}</td>
                                                            <td>{item.deskripsi}</td>
                                                            <td>
                                                                {item.file ? (
                                                                    <img
                                                                        src={`http://localhost:3000/files/${item.file}`}
                                                                        alt={item.nama_produk}
                                                                        width="100"
                                                                        height="100"
                                                                        style={{ objectFit: "cover" }}
                                                                    />
                                                                ) : (
                                                                    "Tidak ada gambar"
                                                                )}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/admin/editproduk/${item.id}`}
                                                                    className="btn btn-sm btn-warning me-2"
                                                                >
                                                                    <i className="fas fa-edit" />
                                                                </Link>
                                                            </td>
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
                                                        <td colSpan="8">Data Kosong</td> {/* Perbaikan colSpan */}
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

export default Produk;
