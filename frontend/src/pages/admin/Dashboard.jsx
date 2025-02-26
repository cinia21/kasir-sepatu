import React from "react";
import { Link } from "react-router-dom";
import TransaksiChart from "../auth/TransaksiChart";

const Dashboard = () => {
  return (
 
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Dashboard</h1>
              
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">Dashboard</li>
              </ol>
            </div>
          </div>
        </div> 
      

      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row d-flex justify-content-center">
            
            {/* Data Cards */}
            {[
              { title: "User", count: 3, icon: "fas fa-user", color: "bg-info", link: "/admin/user" },
              { title: "Pelanggan", count: 53, icon: "fas fa-users", color: "bg-success", link: "/admin/pelanggan" },
              { title: "Kategori", count: 44, icon: "ion ion-pricetags", color: "bg-warning", link: "/admin/kategori" },
              { title: "Produk", count: 65, icon: "ion ion-cube", color: "bg-danger", link: "/admin/produk" },
              { title: "Transaksi", count: 120, icon: "ion ion-cash", color: "bg-purple", link: "/admin/transaksi" },
            ].map((data, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <div className={`small-box ${data.color} shadow-lg rounded`}>
                  <div className="inner text-white">
                    <h3>{data.count}</h3>
                    <p>{data.title}</p>
                  </div>
                  <div className="icon">
                    <i className={`${data.icon} text-white`} style={{ fontSize: "50px" }} />
                  </div>
                  <Link to={data.link} className="small-box-footer text-white font-weight-bold">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div> 
              
            ))}
             <TransaksiChart/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
