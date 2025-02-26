import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nama: "",
        username: "",
        role: "",
        password: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        getUser();
    }, []);

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
    };

    const getUser = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Gagal mengambil data user");

            const data = await response.json();
            setUserData((prev) => ({
                ...prev,
                nama: data.nama,
                username: data.username,
                role: data.role,
            }));
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: "error", text: "Gagal memuat data pengguna" });
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!userData.nama || !userData.username || !userData.role) {
            return Swal.fire({ icon: "warning", text: "Semua bidang kecuali password wajib diisi" });
        }

        const updatedData = { ...userData };

        // Hanya sertakan password jika diisi
        if (!updatedData.password) delete updatedData.password;

        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) throw new Error("Gagal memperbarui data");

            Swal.fire({
                icon: "success",
                text: "Update berhasil",
                timer: 1500,
            }).then(() => navigate("/admin/user"));
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                text: "Gagal memperbarui data!",
            });
        }
    };

    return (
        <>
            <div className="content header">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col">
                            <h2><b>Edit Data User</b></h2>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Edit User</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                </div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama">Nama</label>
                                            <input
                                                type="text"
                                                value={userData.nama}
                                                onChange={handleChange}
                                                name="nama"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                value={userData.username}
                                                onChange={handleChange}
                                                name="username"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                value={userData.password}
                                                onChange={handleChange}
                                                name="password"
                                                className="form-control"
                                            />
                                            <small className="text-danger">Kosongkan jika tidak ingin mengubah password</small>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="role">Role</label>
                                            <select
                                                name="role"
                                                id="role"
                                                className="form-control"
                                                value={userData.role}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">== Pilih Role ==</option>
                                                <option value="admin">Admin</option>
                                                <option value="kasir">Kasir</option>
                                            </select>
                                        </div>
                                    </div>
                                    
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary"style={{backgroundColor:'#690B22'}}>
                                            Simpan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditUser;
