"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface AceptarInvitacionProps {
    id: string;
    fullName: string;
    partnerName: string | null;
    passes: number;
    confirmed: boolean;
}

export default function AceptarInvitacion({
    id,
    fullName,
    partnerName,
    passes,
    confirmed,
}: AceptarInvitacionProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState<"pending" | "confirmed" | "rejected">(
        confirmed ? "confirmed" : "pending"
    );

    const handleConfirm = async (status: "confirmed" | "rejected") => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/invitados/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ confirmed: status === "confirmed" }),
            });

            if (!response.ok) {
                toast.error("Error al procesar tu respuesta");
                setIsLoading(false);
                return;
            }

            setConfirmationStatus(status);
            if (status === "confirmed") {
                toast.success("¡Gracias por confirmar tu asistencia!");
            } else {
                toast.success("Hemos registrado que no podrás asistir");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Error al procesar tu respuesta");
        } finally {
            setIsLoading(false);
        }
    };

    // Escenario 1: Invitación individual (sin acompañante)
    if (passes === 1 && !partnerName) {
        return (
            <section className="bg-background-light px-4 py-24 scroll-mt-12" id="aceptar-invitacion">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl mb-4 tracking-wide">Tu Respuesta</h1>
                        <div className="golden-divider"></div>
                        <p className="font-sans font-light uppercase tracking-[0.2em] text-sm text-slate-500 dark:text-slate-400">
                            Confirma tu asistencia
                        </p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sage-green/20 shadow-sm">
                        <div className="text-center mb-8">
                            <p className="font-sans text-lg text-slate-700 mb-2">Querido/a</p>
                            <h2 className="font-display text-3xl md:text-4xl mb-6 text-sage-900">{fullName}</h2>
                            <p className="font-sans font-light text-slate-600">
                                Tu presencia es importante para nosotros en este día tan especial.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-sage-green/10 to-primary/10 rounded-xl p-6 mb-8 border border-sage-green/20">
                            <p className="font-serif italic text-center text-slate-800">
                                1 lugar reservado para ti
                            </p>
                        </div>

                        {confirmationStatus === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => handleConfirm("confirmed")}
                                    disabled={isLoading}
                                    className="px-8 py-3 bg-sage-green  rounded-full font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {isLoading ? "Procesando..." : "Confirmo mi asistencia"}
                                </button>
                                <button
                                    onClick={() => handleConfirm("rejected")}
                                    disabled={isLoading}
                                    className="px-8 py-3 border-2 border-sage-green text-sage-green rounded-full font-medium hover:bg-sage-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Procesando..." : "No podré asistir"}
                                </button>
                            </div>
                        )}

                        {confirmationStatus === "confirmed" && (
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/20 mb-4">
                                    <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-serif italic text-sage-900 text-lg">
                                    ¡Gracias por confirmar! Te esperamos en la boda.
                                </p>
                            </div>
                        )}

                        {confirmationStatus === "rejected" && (
                            <div className="text-center">
                                <p className="font-serif italic text-slate-700 text-lg">
                                    Hemos registrado tu respuesta. ¡Te extrañaremos!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Escenario 2: Invitación con acompañante
    if (passes === 2 && partnerName && partnerName !== "lover") {
        return (
            <section className="bg-background-light px-4 py-24 scroll-mt-12" id="aceptar-invitacion">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl mb-4 tracking-wide">Tu Respuesta</h1>
                        <div className="golden-divider"></div>
                        <p className="font-sans font-light uppercase tracking-[0.2em] text-sm text-slate-500 dark:text-slate-400">
                            Confirma tu asistencia
                        </p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sage-green/20 shadow-sm">
                        <div className="text-center mb-8">
                            <p className="font-sans text-lg text-slate-700 mb-2">Queridos/as</p>
                            <h2 className="font-display text-3xl md:text-4xl mb-6 text-sage-900">
                                {fullName} & {partnerName}
                            </h2>
                            <p className="font-sans font-light text-slate-600">
                                Su presencia es importante para nosotros en este día tan especial.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gradient-to-r from-sage-green/10 to-primary/10 rounded-xl p-6 border border-sage-green/20 text-center">
                                <p className="font-serif italic text-sm text-slate-700 mb-2">Para</p>
                                <p className="font-display text-lg text-sage-900">{fullName}</p>
                            </div>
                            <div className="bg-gradient-to-r from-primary/10 to-sage-green/10 rounded-xl p-6 border border-sage-green/20 text-center">
                                <p className="font-serif italic text-sm text-slate-700 mb-2">Para</p>
                                <p className="font-display text-lg text-sage-900">{partnerName}</p>
                            </div>
                        </div>

                        {confirmationStatus === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => handleConfirm("confirmed")}
                                    disabled={isLoading}
                                    className="px-8 py-3 bg-sage-green  rounded-full font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {isLoading ? "Procesando..." : "Confirmamos nuestra asistencia"}
                                </button>
                                <button
                                    onClick={() => handleConfirm("rejected")}
                                    disabled={isLoading}
                                    className="px-8 py-3 border-2 border-sage-green text-sage-green rounded-full font-medium hover:bg-sage-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Procesando..." : "No podremos asistir"}
                                </button>
                            </div>
                        )}

                        {confirmationStatus === "confirmed" && (
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/20 mb-4">
                                    <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-serif italic text-sage-900 text-lg">
                                    ¡Gracias por confirmar! Los esperamos en la boda.
                                </p>
                            </div>
                        )}

                        {confirmationStatus === "rejected" && (
                            <div className="text-center">
                                <p className="font-serif italic text-slate-700 text-lg">
                                    Hemos registrado su respuesta. ¡Los extrañaremos!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Escenario 3: Invitación familiar (más de 2 pases)
    if (passes > 2) {
        // Extraer el apellido del nombre completo
        const apellido = fullName.split(" ").slice(-1)[0];

        return (
            <section className="bg-background-light px-4 py-24 scroll-mt-12" id="aceptar-invitacion">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="font-display text-4xl md:text-5xl mb-4 tracking-wide">Tu Respuesta</h1>
                        <div className="golden-divider"></div>
                        <p className="font-sans font-light uppercase tracking-[0.2em] text-sm text-slate-500 dark:text-slate-400">
                            Confirma tu asistencia
                        </p>
                    </div>

                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sage-green/20 shadow-sm">
                        <div className="text-center mb-8">
                            <p className="font-sans text-lg text-slate-700 mb-2">Querida familia</p>
                            <h2 className="font-display text-3xl md:text-4xl mb-6 text-sage-900">Fam. {apellido}</h2>
                            <p className="font-sans font-light text-slate-600">
                                Su presencia es importante para nosotros en este día tan especial.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-sage-green/10 to-primary/10 rounded-xl p-6 mb-8 border border-sage-green/20">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                {Array.from({ length: passes }).map((_, i) => (
                                    <div key={i} className="w-2 h-2 rounded-full bg-sage-green" />
                                ))}
                            </div>
                            <p className="font-serif italic text-center text-slate-800">
                                {passes} lugares reservados para tu familia
                            </p>
                        </div>

                        {confirmationStatus === "pending" && (
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => handleConfirm("confirmed")}
                                    disabled={isLoading}
                                    className="px-8 py-3 bg-sage-green rounded-full font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                                >
                                    {isLoading ? "Procesando..." : "Confirmamos nuestra asistencia"}
                                </button>
                                <button
                                    onClick={() => handleConfirm("rejected")}
                                    disabled={isLoading}
                                    className="px-8 py-3 border-2 border-sage-green text-sage-green rounded-full font-medium hover:bg-sage-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Procesando..." : "No podremos asistir"}
                                </button>
                            </div>
                        )}

                        {confirmationStatus === "confirmed" && (
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/20 mb-4">
                                    <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="font-serif italic text-sage-900 text-lg">
                                    ¡Gracias por confirmar! Los esperamos en la boda.
                                </p>
                            </div>
                        )}

                        {confirmationStatus === "rejected" && (
                            <div className="text-center">
                                <p className="font-serif italic text-slate-700 text-lg">
                                    Hemos registrado su respuesta. ¡Los extrañaremos!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    // Escenario alternativo: con "lover"
    return (
        <section className="bg-background-light px-4 py-24 scroll-mt-12" id="aceptar-invitacion">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-5xl mb-4 tracking-wide">Tu Respuesta</h1>
                    <div className="golden-divider"></div>
                    <p className="font-sans font-light uppercase tracking-[0.2em] text-sm text-slate-500 dark:text-slate-400">
                        Confirma tu asistencia
                    </p>
                </div>

                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-sage-green/20 shadow-sm">
                    <div className="text-center mb-8">
                        <p className="font-sans text-lg text-slate-700 mb-2">Querido/a</p>
                        <h2 className="font-display text-3xl md:text-4xl mb-6 text-sage-900">{fullName}</h2>
                        <p className="font-sans font-light text-slate-600">
                            Tu presencia es importante para nosotros en este día tan especial.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-sage-green/10 to-primary/10 rounded-xl p-6 mb-8 border border-sage-green/20">
                        <p className="font-serif italic text-center text-slate-800">
                            2 lugares reservados para ti
                        </p>
                    </div>

                    {confirmationStatus === "pending" && (
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => handleConfirm("confirmed")}
                                disabled={isLoading}
                                className="px-8 py-3 bg-sage-green rounded-full font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                {isLoading ? "Procesando..." : "Confirmamos nuestra asistencia"}
                            </button>
                            <button
                                onClick={() => handleConfirm("rejected")}
                                disabled={isLoading}
                                className="px-8 py-3 border-2 border-sage-green text-sage-green rounded-full font-medium hover:bg-sage-green hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Procesando..." : "No podremos asistir"}
                            </button>
                        </div>
                    )}

                    {confirmationStatus === "confirmed" && (
                        <div className="text-center">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/20 mb-4">
                                <svg className="w-6 h-6 text-sage-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p className="font-serif italic text-sage-900 text-lg">
                                ¡Gracias por confirmar! Los esperamos en la boda.
                            </p>
                        </div>
                    )}

                    {confirmationStatus === "rejected" && (
                        <div className="text-center">
                            <p className="font-serif italic text-slate-700 text-lg">
                                Hemos registrado su respuesta. ¡Los extrañaremos!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
