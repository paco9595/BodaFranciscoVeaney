"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_CLASS = "fixed bottom-6 right-6 z-50 bg-primary/90 text-white p-3 rounded-full shadow-lg transition-all duration-300 opacity-0 pointer-events-none translate-y-4 hover:bg-primary hover:shadow-xl focus:outline-none flex items-center justify-center cursor-pointer";
const HIDE_CLASS = "opacity-0 pointer-events-none translate-y-4";
const SHOW_CLASS = "opacity-100 pointer-events-auto translate-y-0";

export default function BackToTop() {
    const ref = useRef<HTMLButtonElement>(null);
    const [isOnTop, setIsOnTop] = useState(true);
    useEffect(() => {
        const backToTopButton = ref.current;
        const scrollThreshold = 200;

        const toggleButton = () => {
            if (window.scrollY > scrollThreshold) {
                setIsOnTop(false);
                backToTopButton?.classList.remove("opacity-0", "pointer-events-none", "translate-y-4");
                backToTopButton?.classList.add("opacity-100", "pointer-events-auto", "translate-y-0");
            } else {
                setIsOnTop(true);
                backToTopButton?.classList.add("opacity-0", "pointer-events-none", "translate-y-4");
                backToTopButton?.classList.remove("opacity-100", "pointer-events-auto", "translate-y-0");
            }
        };

        window.addEventListener("scroll", toggleButton);
        return () => window.removeEventListener("scroll", toggleButton);
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <button
            ref={ref}
            className={cn(DEFAULT_CLASS, isOnTop ? HIDE_CLASS : SHOW_CLASS)}
            aria-label="Volver arriba"
            onClick={goToTop}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
        </button>
    );
}
