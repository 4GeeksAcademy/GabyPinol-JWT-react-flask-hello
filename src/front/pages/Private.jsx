import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const backendUrl = import.meta.env.VITE_BACKEND_URL || process.env.BACKEND_URL;

        fetch(`${backendUrl}/api/private`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => {
            if (!res.ok) throw new Error("Token expirado o inválido");
            return res.json();
        })
        .then(data => setMessage(data.msg))
        .catch(() => {
            sessionStorage.removeItem("token");
            navigate("/login");
        });
    }, [navigate]);

    return (
        <div className="container mt-5 text-center">
            <div className="card p-4 shadow-sm">
                <h2>🔒 Zona Privada</h2>
                <p className="lead mt-3">{message || "Verificando acceso..."}</p>
            </div>
        </div>
    );
};