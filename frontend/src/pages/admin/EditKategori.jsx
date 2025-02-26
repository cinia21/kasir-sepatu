import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Editkategori = () => {
    const { id } = useParams();  // Get the id from the URL parameters
    const navigate = useNavigate();
    const [KategoriData, setKategoriData] = useState({
        nama_kategori: "",
    });

    const token = localStorage.getItem("token");

    useEffect(() => {
        getKategori();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setKategoriData({ ...KategoriData, [name]: value });
    };

    const getKategori = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/kategori/${id}`, {  // Use dynamic id
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Gagal mengambil data kategori");

            const data = await response.json();
            setKategoriData({
                nama_kategori: data.nama_kategori,
            });
        } catch (error) {
            console.error(error);
            Swal.fire({ icon: "error", text: "Gagal memuat data kategori" });
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();

        if (!KategoriData.nama_kategori) {
            return Swal.fire({ icon: "warning", text: "Semua bidang wajib diisi" });
        }

        const updatedData = { ...KategoriData };

        try {
            const response = await fetch(`http://localhost:3000/api/kategori/${id}`, {  // Use dynamic id
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
            }).then(() => navigate("/admin/kategori"));
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
                            <h2><b>Edit Data Kategori</b></h2>
                        </div>
                        <div className="col">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Edit Kategori</li>
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
                                            <label htmlFor="nama_kategori">Nama Kategori</label>
                                            <input
                                                type="text"
                                                value={KategoriData.nama_kategori}  // Use the correct state variable
                                                onChange={handleChange}
                                                name="nama_kategori"
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

export default Editkategori;
