'use client'
import { cn } from "@/lib/utils";
import { useState } from "react";

const BASE_CLASS = "fixed inset-0 bg-white/95 z-40 transform transition-transform duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 text-2xl font-light"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header
            className="relative bg-[url('/assets/images/back&wihite.jpeg')] w-full h-[500px] bg-no-repeat bg-cover lg:h-[700px] lg:bg-auto bg-center justify-center items-center">

            <nav className="absolute top-0 left-0 z-50 w-full flex justify-end p-4">
                <img id="menu-toggle" src="/assets/icons/menu.svg" alt="menu"
                    className="w-8 h-8 cursor-pointer transition-transform duration-300" onClick={toggleMenu} />
            </nav>

            <div id="mobile-menu"
                className={cn(BASE_CLASS, isMenuOpen ? "translate-x-0" : "translate-x-full")}>
                <a href="#" onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 transition-colors menu-link">Inicio</a>
                <a href="#" onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 transition-colors menu-link">Dónde y Cuándo</a>
                <a href="#" onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 transition-colors menu-link">Mesa de Regalos</a>
                <a href="#galeria" onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 transition-colors menu-link">Galeria</a>
                <a href="#ubicacion" onClick={toggleMenu} className="text-gray-800 hover:text-gray-500 transition-colors menu-link">Ubicación</a>
            </div>
        </header>
    );
}
