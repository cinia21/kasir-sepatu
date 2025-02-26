import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Kategori = () => {
    const [dataKategori, setKategori] = useState([]);
    const token = localStorage.getItem("token");

    const tampilData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/kategori/", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            if (!response.ok) throw new Error("Gagal mengambil data kategori");

            const data = await response.json();
            setKategori(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire("Error!", "Gagal memuat data kategori.", "error");
        }
    };

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin Menghapus Kategori?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/kategori/${id}`, { 
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        setKategori(dataKategori.filter((kategori) => kategori.id !== id));
                        Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
                    })
                    .catch((error) => {
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
                            <h1 className="m-0">Data Kategori</h1>
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
                                            to="/admin/addkategori"
                                            className="btn btn-lg"
                                            style={{ borderRadius: 5, background: "#690B22", color: "white" }}
                                        >
                                            <i className="fas fa-plus me-2" />
                                            Tambah Kategori
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead>
                                            <tr style={{ backgroundColor: '#E17564', color: "white" }}>
                                                    <th>ID</th>
                                                    <th>Nama Kategori</th>
                                                    <th>Edit</th>
                                                    <th>Hapus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataKategori.length > 0 ? (
                                                    dataKategori.map((item) => (
                                                        <tr key={item.id}>
                                                            <td>{item.id}</td>
                                                            <td>{item.nama_kategori}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/admin/editkategori/${item.id}`} 
                                                                    className="btn btn-sm btn-warning"
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
                                                        <td colSpan="4">Data Kosong</td>
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

export default Kategori;
