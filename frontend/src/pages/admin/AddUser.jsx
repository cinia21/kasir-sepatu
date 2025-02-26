import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
    const [formData, setFormData] = useState({
        nama: "",
        username: "",
        password: "",
        role: "admin",
    });

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Swal.fire("Error!", "User tidak ditemukan, silakan isi ulang", "error");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Gagal menambahkan user");
            }

            await response.json();
            Swal.fire("Sukses!", "User berhasil ditambahkan", "success");
            navigate("/admin/user");
        } catch (error) {
            Swal.fire("Error!", error.message, "error");
        }
    };

    return (
        <div className="container mt-5">
            <h2><b>Tambah User</b></h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        className="form-control"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="form-control"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="form-control"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select
                        name="role"
                        className="form-select"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="admin">Admin</option>
                        <option value="kasir">Kasir</option>
                        
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{backgroundColor:'#690B22'}}>
                    Simpan
                </button>
            </form>
        </div>
    );
};

export default AddUser;
