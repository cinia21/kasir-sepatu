import React from 'react';

const Footer = () => {
    return (
        <footer className="main-footer text-center py-4" style={{ backgroundColor: '#f8f9fa' }}>
            <strong>
                Copyright © 2024-2025  
                <a href="http://localhost:5173/admin" 
                   className="text-decoration-none" 
                   style={{ color: '#690B22', marginLeft: '5px' }}>
                    YaYa_Shoes
                </a>.
            </strong>
        </footer>
    );
}

export default Footer;
