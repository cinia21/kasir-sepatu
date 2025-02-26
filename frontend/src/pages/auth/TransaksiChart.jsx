import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransaksiChart = () => {
    const [dataTransaksi, setDataTransaksi] = useState([]);
    const [dataProduk, setDataProduk] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const responseTransaksi = await fetch("http://localhost:3000/api/transaksi/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const transaksi = await responseTransaksi.json();
            setDataTransaksi(transaksi);

            const responseProduk = await fetch("http://localhost:3000/api/produk/", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const produk = await responseProduk.json();
            setDataProduk(produk);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Hitung jumlah pembelian per produk (bukan hanya jumlah transaksi)
    const pembelianPerProduk = dataTransaksi.reduce((acc, item) => {
        acc[item.id_produk] = (acc[item.id_produk] || 0) + item.jumlah; // Gunakan jumlah pembelian dari transaksi
        return acc;
    }, {});

    // Ubah ID Produk menjadi Nama Produk
    const labels = Object.keys(pembelianPerProduk).map((id) => {
        const produk = dataProduk.find((p) => p.id === parseInt(id));
        return produk ? produk.nama_produk : `Produk ${id}`;
    });

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Jumlah Pembelian",
                data: Object.values(pembelianPerProduk),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Grafik Jumlah Pembelian per Produk" },
        },
        scales: {
            y: {
                ticks: {
                    precision: 0, // Pastikan angka tidak memiliki koma
                    callback: function (value) {
                        return Number(value).toFixed(0);
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>
            <h2>Grafik Jumlah Pembelian Produk</h2>
            <button onClick={fetchData} style={{ marginBottom: "10px", padding: "5px 10px", background: "#690B22", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Refresh Data
            </button>
            {isLoading ? <p>Loading...</p> : <Bar data={chartData} options={options} />}
        </div>
    );
};

export default TransaksiChart;
