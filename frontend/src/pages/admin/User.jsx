import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const [dataUser, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    const tampilData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        tampilData();
    }, []);

    const handleDelete = (id) => {
        Swal.fire({
            icon: "warning",
            title: "Yakin Menghapus Data?",
            showCancelButton: true,
            confirmButtonText: "Yakin",
            cancelButtonText: "Batal",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/api/users/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then(() => {
                        setUsers(dataUser.filter((user) => user.id !== id));
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
                            <h1 className="m-0">Data User</h1>
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
                                        <Link to="/admin/adduser" className="btn btn-lg" style={{ borderRadius: 5, background: "#690B22", color: "white" }}>
                                            <i className="fas fa-plus me-2" /> Tambah User
                                        </Link>
                                    </div>

                                    <div className="table-responsive">
                                        <table className="table text-center">
                                            <thead>
                                                <tr style={{ backgroundColor: '#E17564', color: "white" }}>
                                                    <th>ID</th>
                                                    <th>Nama</th>
                                                    <th>Username</th>
                                                    <th>Role</th>
                                                    <th>Edit</th>
                                                    <th>Hapus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataUser.length > 0 ? (
                                                    dataUser.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.nama}</td>
                                                            <td>{item.username}</td>
                                                            <td>{item.role}</td>
                                                            <td>
                                                                <Link to={`/admin/edituser/${item.id}`} type="button" className="btn btn-sm btn-warning">
                                                                    <i className="fas fa-edit" />
                                                                </Link>
                                                            </td>
                                                            <td>
                                                                <Link onClick={() => handleDelete(item.id)} className="btn btn-sm btn-danger">
                                                                    <i className="fas fa-trash" />
                                                                </Link>
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

export default Users;
