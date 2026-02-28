"use client";

import { useState } from "react";

export default function Galeria() {
    // Track the currently active image (null means none are active)
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleImage = (index: number) => {
        setActiveIndex((prev) => (prev === index ? null : index));
    };

    const images = [
        { src: "/assets/images/frontal.JPEG", alt: "Detailed shot of holding hands", dataAlt: "Close up of couple holding hands" },
        { src: "/assets/images/pedida.JPEG", alt: "Laughing together candidly", dataAlt: "Couple laughing together in a park" },
        { src: "/assets/images/escaleras.jpg", alt: "Couple embracing in black and white", dataAlt: "Black and white photo of a couple hugging outdoors" },
        { src: "/assets/images/ventana.jpg", alt: "Wedding ring detail", dataAlt: "Close up of wedding rings on a table" },
        { src: "/assets/images/giro.jpg", alt: "Portrait in minimal studio", dataAlt: "Minimalist studio portrait of the couple" },
        { src: "/assets/images/espaldas.jpg", alt: "Walking away on a path", dataAlt: "Couple walking away on a forest path" },
    ];

    return (
        <section className="relative z-20 bg-background-light px-4 scroll-mt-12" id="galeria">
            <div className="text-center mb-12 relative">
                <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4 tracking-tight">Nuestros Momentos</h1>
                <div className="w-16 h-1 bg-primary/40 mx-auto rounded-full mb-6"></div>
                <p className="max-w-md mx-auto text-stone-600 dark:text-stone-400 text-lg font-light leading-relaxed">
                    Una colección de nuestros recuerdos favoritos juntos, capturados en blanco y negro para la eternidad.
                </p>
            </div>
            <div className=" px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 ">
                    {images.map((img, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={index}
                                onClick={() => toggleImage(index)}
                                className="masonry-item group relative overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-800 shadow-sm transition-all hover:shadow-md cursor-pointer"
                            >
                                <img
                                    alt={img.alt}
                                    data-alt={img.dataAlt}
                                    src={img.src}
                                    className={`w-full h-auto object-cover transition-all duration-700 ease-in-out transform ${isActive
                                        ? "grayscale-0 scale-105 is-active"
                                        : "grayscale group-hover:grayscale-0 group-hover:scale-105"
                                        }`}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
