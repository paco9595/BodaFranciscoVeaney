"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Link from "next/link";

export default function QrPage() {
    const [qrImageUrl, setQrImageUrl] = useState<string>("");

    useEffect(() => {
        // Obtenemos la URL actual y la dirigimos a la página de fotos
        // Puedes cambiar esta URL manualmente si ya sabes tu dominio final (ej. https://miboda.com/photos)
        const uploadUrl = window.location.origin + "/photos";

        const generateQR = async () => {
            try {
                // Generamos código QR con colores acordes a la boda (opcional: margin para borde)
                const url = await QRCode.toDataURL(uploadUrl, {
                    width: 400,
                    margin: 2,
                    color: {
                        dark: '#333333', // Color de los cuadritos
                        light: '#ffffff' // Color de fondo
                    }
                });
                setQrImageUrl(url);
            } catch (err) {
                console.error("Error generando el QR:", err);
            }
        };

        generateQR();
    }, []);

    const handleDownload = () => {
        if (!qrImageUrl) return;

        const link = document.createElement("a");
        link.href = qrImageUrl;
        link.download = "QR_Sube_Fotos_Boda.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <main className="min-h-screen py-24 px-4 bg-linear-to-br from-[#faf9f6] to-[#f4eee6] flex flex-col items-center justify-center">
            <div className="max-w-md w-full bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl p-8 shadow-sm text-center">
                <h1 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">Código QR</h1>
                <p className="text-gray-600 font-light mb-8">
                    Imprime o comparte este código QR para que los invitados puedan escanearlo y subir sus fotos directamente.
                </p>

                {qrImageUrl ? (
                    <div className="flex flex-col items-center">
                        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 inline-block">
                            <img src={qrImageUrl} alt="QR Code" className="w-64 h-64 object-contain rounded-xl" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                            <button
                                onClick={handleDownload}
                                className="px-6 py-3 bg-[#b59e7a] hover:bg-[#a68f6a] text-white rounded-full transition-all duration-300 shadow-md font-medium flex items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                </svg>
                                Descargar Imagen
                            </button>

                            <Link
                                href="/photos"
                                className="px-6 py-3 bg-white border-2 border-[#b59e7a] text-[#b59e7a] hover:bg-[#b59e7a] hover:text-white rounded-full transition-all duration-300 font-medium flex items-center justify-center"
                            >
                                Ir a la galería
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center py-12">
                        <svg className="animate-spin h-8 w-8 text-[#b59e7a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </div>
        </main>
    );
}