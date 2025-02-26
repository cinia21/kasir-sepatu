import React from 'react';
import Swal from 'sweetalert2';

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fData = {};

    for (let elm of event.target.elements) {
      if (elm.name === "username" || elm.name === "password") {
        fData[elm.name] = elm.value;
      }
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fData),
      });

      if (!response.ok) {
        throw new Error("Login gagal, periksa kembali username dan password");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        event.target.reset();
        window.location.href = "/admin/dashboard";
      } else {
        throw new Error("User tidak ditemukan");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.message,
        timer: 2000,
      });
    }
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "linear-gradient(to right, #690B22, #E17564)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      overflow: "hidden",
    }}>
      <div className="login-box" style={{
        background: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <div className="login-logo" style={{ textAlign: "center", marginBottom: "15px" }}>
          <a href="#" style={{ fontSize: "24px", fontWeight: "bold", color: "#690B22" }}>
            <b>YAYA</b>SHOES
          </a>
        </div>
        <div className="card-body">
          <p className="login-box-msg" style={{ textAlign: "center", color: "#666" }}>
            Sign in to start your session
          </p>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Username"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#957DAD")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  transition: "0.3s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#957DAD")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>
            <div className="row">
              <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember" style={{ color: "#666" }}>
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="col-4">
                <button type="submit" className="btn btn-primary btn-block" style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "6px",
                  background: "#E17564",
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
                  onMouseEnter={(e) => (e.target.style.background = "#690B22")}
                  onMouseLeave={(e) => (e.target.style.background = "#E17564")}
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
