import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	const token = sessionStorage.getItem("token");

	const handleLogout = () => {
		sessionStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto d-flex gap-2">
					{!token ? (
						<>
							<Link to="/login">
								<button className="btn btn-outline-primary">Iniciar Sesión</button>
							</Link>
							<Link to="/signup">
								<button className="btn btn-primary">Registrarse</button>
							</Link>
						</>
					) : (
						<>
							<Link to="/private">
								<button className="btn btn-outline-success">Zona Privada</button>
							</Link>
							<button onClick={handleLogout} className="btn btn-danger">
								Cerrar Sesión
							</button>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};