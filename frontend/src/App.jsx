import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/auth/Login";
import Users from "./pages/admin/User";
import AddUser from "./pages/admin/AddUser";
import EditUser from "./pages/admin/EditUser";
import Kategori from "./pages/admin/kategori";
import AddKategori from "./pages/admin/AddKategori";
import Editkategori from "./pages/admin/EditKategori";
import Pelanggan from "./pages/admin/Pelanggan";
import AddPelanggan from "./pages/admin/AddPelanggan";
import EditPelanggan from "./pages/admin/EditPelanggan";
import Produk from "./pages/admin/Produk";
import AddProduk from "./pages/admin/AddProduk";
import EditProduk from "./pages/admin/EditProduk";
import Transaksi from "./pages/admin/Transaksi";
import AddTransaksi from "./pages/admin/AddTransaksi";
import TransaksiChart from "./pages/auth/TransaksiChart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Layout />} >
        <Route path="dashboard" element={<Dashboard />}/>
        <Route path="transaksichart" element={<TransaksiChart />}/>

        <Route path="user" element={<Users/> } />
        <Route path="AddUser" element={<AddUser/> } />
        <Route path="edituser/:id" element={<EditUser/>} />

        <Route path="kategori" element={<Kategori/>}/>
        <Route path="Addkategori" element={<AddKategori/>}/>
        <Route path="editkategori/:id" element={<Editkategori/>}/>

        <Route path="pelanggan" element={<Pelanggan/>}/>
        <Route path="AddPelanggan" element={<AddPelanggan/>}/>
        <Route path="EditPelanggan/:id" element={<EditPelanggan/>}/>

        <Route path="produk" element={<Produk/>}/>
        <Route path="AddProduk" element={<AddProduk/>}/>
        <Route path="EditProduk/:id" element={<EditProduk/>}/>

        <Route path="Transaksi" element={<Transaksi/>}/>
        <Route path="AddTransaksi" element={<AddTransaksi/>}/>

        </Route>
        <Route path="/" element={<AuthLayout/>}>
        <Route path="/" element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;