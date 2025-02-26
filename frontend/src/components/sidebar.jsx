import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const Logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
    };

    return (
        <div>
            <aside className="main-sidebar sidebar-light-primary elevation-4" style={{ backgroundColor: "#690B22" }}>
                {/* Brand Logo */}
                <a href="index3.html" className="brand-link">
                    <img src="/images/ys.jpg" className="brand-image img-circle" style={{ paddingLeft: '3px' }} />        
                    <span className="text-3xl font-bold text-white">YaYa_Shoes</span>
                </a>
                {/* Sidebar */}
                <div className="sidebar">
                    {/* Sidebar user panel (optional) */}
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src="/images/akuuu.jpg" className="brand-image img-circle" style={{ paddingLeft: '3px' }} />
                        </div>
                        <div className="info">
                            <a href="#" className="d-block text-white">Niaaacilik</a>
                        </div>
                    </div>
                    {/* Sidebar Menu */}
                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item menu-open">
                                <ul className='nav nav-treeview'>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/dashboard" className="nav-link text-white">
                                            <i className='nav-icon fas fa-file text-white' />
                                            <p>Dashboard</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/user" className="nav-link text-white">
                                            <i className='nav-icon fas fa-child text-white' />
                                            <p>User</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/pelanggan" className="nav-link text-white">
                                            <i className='nav-icon fas fa-address-book text-white' />
                                            <p>Pelanggan</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/produk" className="nav-link text-white">
                                            <i className='nav-icon fa fa-shopping-bag text-white' />
                                            <p>Produk</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/kategori" className="nav-link text-white">
                                            <i className='nav-icon fa fa-tags text-white' />
                                            <p>Kategori</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <NavLink to="/admin/transaksi" className="nav-link text-white">
                                            <i className='nav-icon fas fa-hourglass-end text-white' />
                                            <p>Transaksi</p>
                                        </NavLink>
                                    </li>
                                    <li className='nav-item'>
                                        <a onClick={Logout} className="nav-link text-white cursor-pointer">
                                            <i className='nav-icon fas fa-sign-out-alt text-white' />
                                            <p>Log Out</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
