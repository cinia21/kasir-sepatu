import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Pelanggan = () => {
    const [dataPelanggan, setPelanggan] = useState([]);
    const token = localStorage.getItem("token");

    const tampilData = async () => {
        if (!token) {
            Swal.fire("Error!", "Token tidak ditemukan. Silakan login ulang.", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/pelanggan", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data pelanggan");
            }

            const data = await response.json();
            console.log(data); // Cek struktur data di konsol
            setPelanggan(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            Swal.fire("Error!", "Gagal mengambil data pelanggan.", "error");
        }
    };

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Yakin Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal",
        });

        if (!result.isConfirmed) return;

        try {
            const response = await fetch(`http://localhost:3000/api/pelanggan/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal menghapus data pelanggan");
            }

            setPelanggan(dataPelanggan.filter((pelanggan) => pelanggan.id !== id));
            Swal.fire("Berhasil!", "Data berhasil dihapus.", "success");
        } catch (error) {
            console.error("Error deleting data:", error);
            Swal.fire("Error!", "Terjadi kesalahan saat menghapus data.", "error");
        }
    };

    return (
        <>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">DATA PELANGGAN</h1>
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
                                            to="/admin/addpelanggan"
                                            className="btn btn-lg"
                                            style={{ borderRadius: 5, background: "#690B22", color: "white" }}
                                        >
                                            <i className="fas fa-plus me-2" />
                                            Tambah Pelanggan
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead>
                                            <tr style={{ backgroundColor: '#E17564', color: "white" }}>
                                                    <th>ID</th>
                                                    <th>Nama Pelanggan</th>
                                                    <th>Alamat</th>
                                                    <th>No Hp</th>
                                                    <th>Edit</th>
                                                    <th>Hapus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataPelanggan.length > 0 ? (
                                                    dataPelanggan.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama_pelanggan}</td>
                                                            <td>{item.alamat}</td>
                                                            <td>{item.no_hp}</td>
                                                            <td>
                                                                <Link
                                                                    to={`/admin/editpelanggan/${item.id}`}
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
                                                        <td colSpan="6">Data Kosong</td>
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

export default Pelanggan;
