import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Importa BrowserRouter, Routes y Route desde react-router-dom
import App from './App';
import ListaContactos from './Contacto';

export const Layout = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route element={<App />} path="/AñadirContacto/:id" />
                    <Route element={<App />} path="/AñadirContacto/" />
                    <Route element={<ListaContactos />} path="/" />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
