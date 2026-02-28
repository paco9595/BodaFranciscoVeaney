"use client";

import { useState, useEffect } from "react";

export default function SaveTheDate() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const fecha = new Date("2027-05-01T12:00:00").getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const diff = fecha - now;

            if (diff > 0) {
                setTimeLeft({
                    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((diff % (1000 * 60)) / 1000),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        // Ejecutar inmediatamente para evitar el parpadeo
        updateTimer();
        const intervalId = setInterval(updateTimer, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <section
            className="flex flex-col items-center justify-center pt-20 rounded-t-[20px] relative z-10 -mt-4 bg-background-light shadow-[0_-15px_40px_rgba(0,0,0,0.15)]">
            <h1 className="font-script text-5xl md:text-6xl text-primary mb-2">Save the Date</h1>
            <div className="border-r-2 border-emerald-900/30 h-8"></div>
            <p className="text-2xl mt-4">Sabado 01 de Mayo del 2027</p>

            <div
                className="grid grid-cols-1 md:grid-cols-4 justify-center  text-center mt-10 divide-y md:divide-y-0 md:divide-x divide-primary">
                <div className="p-8 md:py-0">
                    <p id="countdown-days" className="text-5xl font-light">{String(days).padStart(2, '0')}</p>
                    <p className="text-sm font-light uppercase tracking-wider mt-1">Días</p>
                </div>
                <div className="p-8 md:py-0">
                    <p id="countdown-hours" className="text-5xl font-light">{String(hours).padStart(2, '0')}</p>
                    <p className="text-sm font-light uppercase tracking-wider mt-1">Horas</p>
                </div>
                <div className="p-8 md:py-0">
                    <p id="countdown-minutes" className="text-5xl font-light">{String(minutes).padStart(2, '0')}</p>
                    <p className="text-sm font-light uppercase tracking-wider mt-1">Minutos</p>
                </div>
                <div className="pt-8 md:py-0">
                    <p id="countdown-seconds" className="text-5xl font-light">{String(seconds).padStart(2, '0')}</p>
                    <p className="text-sm font-light uppercase tracking-wider mt-1">Segundos</p>
                </div>
            </div>
            <p className="font-serif italic text-sage-600 text-xl md:text-2xl text-center px-8 py-16">
                "El amor no se consiste en mirarse el uno al otro, sino en mirar juntos en la misma dirección"
            </p>
        </section>
    );
}
