const koneksi = require("./db");
const bcrypt = require("bcryptjs");

const selectUsers = (callback) => {
    const q = "SELECT * FROM users";
    koneksi.query(q, callback);
};
const insertUser = (nama, username, password,role, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "INSERT INTO users(nama,username,password,role) VALUES(?,?,?,?) ";
        koneksi.query(q, [nama, username, hashedPassword,role], callback);
    } else {
        console.error("password harus di isi");
    }
};
const selectUserById = (id, callback) => {
    const q = "SELECT * FROM users where id =?";
    koneksi.query(q, [id], callback);
};
const updateUser =(id, nama, username, password,role, callback) => {
    if (password) {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const q = "update users set nama=?,username=?,password=?, role=? where id=?";
        koneksi.query(q, [nama, username, hashedPassword,role, id], callback);
    } else {
        const q = "update users set nama=?,username=?,role=? where id=?";
        koneksi.query(q, [nama, username,role, id], callback);
    }
}; 
const deleteUser = (id, callback) => {
    const q = "DELETE FROM users where id =?";
    koneksi.query(q, [id], callback);
};
const selectUsersByUsername =(username,callback) => {
    const q =`select * from users where username=?`
    koneksi.query(q,[username],callback)
}
module.exports= {selectUsers, insertUser, selectUserById, updateUser, deleteUser, selectUsersByUsername}