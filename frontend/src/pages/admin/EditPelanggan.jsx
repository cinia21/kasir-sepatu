import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EditPelanggan = () => {
    const { id } = useParams();  
    const navigate = useNavigate();
    const [PelangganData, setPelangganData] = useState({
        nama_pelanggan: "",
        alamat: "",
        no_hp: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        getPelanggan();
    }, [id]); 
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setPelangganData({ ...PelangganData, [name]: value });
    };

    const getPelanggan = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/pelanggan/${id}`, { 
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Gagal mengambil data pelanggan");
            }

            const data = await response.json();
            console.log("Data pelanggan yang diterima:", data); 

            setPelangganData({ 
                nama_pelanggan: data.nama_pelanggan, 
                alamat: data.alamat, 
                no_hp: data.no_hp 
            });

        } catch (error) {
            console.error("Error saat mengambil data pelanggan:", error);
            Swal.fire({ icon: "error", text: "Gagal memuat data pelanggan" });
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!PelangganData.nama_pelanggan || !PelangganData.alamat || !PelangganData.no_hp) {
            return Swal.fire({ icon: "warning", text: "Semua bidang wajib diisi" });
        }

        try {
            const response = await fetch(`http://localhost:3000/api/pelanggan/${id}`, {  
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(PelangganData),
            });

            if (!response.ok) {
                throw new Error("Gagal memperbarui data");
            }

            Swal.fire({
                icon: "success",
                text: "Update berhasil",
                timer: 1500,
            }).then(() => navigate("/admin/pelanggan"));

        } catch (error) {
            console.error("Error saat update pelanggan:", error);
            Swal.fire({ icon: "error", text: "Gagal memperbarui data!" });
        }
    };

    return (
        <>
            <div className="content header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h2><b>Edit Data Pelanggan</b></h2>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Edit pelanggan</li>
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
                                <div className="card-header"></div>
                                <form onSubmit={handleUpdate}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="nama_pelanggan">Nama pelanggan</label>
                                            <input
                                                type="text"
                                                value={PelangganData.nama_pelanggan}
                                                onChange={handleChange}
                                                name="nama_pelanggan"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="alamat">Alamat</label>
                                            <input
                                                type="text"
                                                value={PelangganData.alamat}
                                                onChange={handleChange}
                                                name="alamat"
                                                className="form-control"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="no_hp">No Hp</label>
                                            <input
                                                type="text"
                                                value={PelangganData.no_hp}
                                                onChange={handleChange}
                                                name="no_hp"
                                                className="form-control"
                                                required
                                            />
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

export default EditPelanggan;
