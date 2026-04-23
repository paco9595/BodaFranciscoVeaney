export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white/80">
            {/* Divisor decorativo */}
            <div className="h-px bg-gradient-to-r from-transparent via-sage-green/30 to-transparent"></div>

            <div className="px-8 py-16 md:py-20">
                <div className="max-w-6xl mx-auto">
                    {/* Grid principal */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                        {/* Sección 1: Información de la Boda */}
                        <div className="text-center md:text-left">
                            <h3 className="font-display text-xl md:text-2xl text-white mb-6">
                                Nuestra Boda
                            </h3>
                            <div className="space-y-4 font-light text-sm">
                                <div>
                                    <p className="text-sage-green/80 uppercase tracking-widest text-xs mb-1">
                                        Fecha
                                    </p>
                                    <p className="text-white/90">
                                        Sábado, 01 de Mayo del 2027
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sage-green/80 uppercase tracking-widest text-xs mb-1">
                                        Ceremonia
                                    </p>
                                    <p className="text-white/90">17:00 Horas</p>
                                </div>
                                <div>
                                    <p className="text-sage-green/80 uppercase tracking-widest text-xs mb-1">
                                        Recepción
                                    </p>
                                    <p className="text-white/90">19:30 Horas</p>
                                </div>
                            </div>
                        </div>

                        {/* Sección 2: Ubicaciones */}
                        <div className="text-center">
                            <h3 className="font-display text-xl md:text-2xl text-white mb-6">
                                Ubicaciones
                            </h3>
                            <div className="space-y-4 font-light text-sm">
                                <div>
                                    <p className="text-sage-green/80 uppercase tracking-widest text-xs mb-2">
                                        Ceremonia
                                    </p>
                                    <p className="text-white/90 text-xs leading-relaxed">
                                        La Parroquia de Nuestra<br />
                                        Señora del Carmen<br />
                                        <span className="text-white/60">
                                            San Luis Potosí, S.L.P.
                                        </span>
                                    </p>
                                </div>
                                <div className="pt-2">
                                    <p className="text-sage-green/80 uppercase tracking-widest text-xs mb-2">
                                        Recepción
                                    </p>
                                    <p className="text-white/90 text-xs leading-relaxed">
                                        Quinta de los Olivos<br />
                                        <span className="text-white/60">
                                            Monterrey, Nuevo León
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sección 3: Enlaces */}
                        <div className="text-center md:text-right">
                            <h3 className="font-display text-xl md:text-2xl text-white mb-6">
                                Secciones
                            </h3>
                            <nav className="space-y-2 font-light text-sm">
                                <a
                                    href="#ubicacion"
                                    className="block text-white/70 hover:text-sage-green transition-colors duration-300"
                                >
                                    Ubicación
                                </a>
                                <a
                                    href="#aceptar-invitacion"
                                    className="block text-white/70 hover:text-sage-green transition-colors duration-300"
                                >
                                    Confirmar Asistencia
                                </a>
                                <a
                                    href="/photos"
                                    className="block text-white/70 hover:text-sage-green transition-colors duration-300"
                                >
                                    Galería de Fotos
                                </a>
                                <a
                                    href="#mesa-regalos"
                                    className="block text-white/70 hover:text-sage-green transition-colors duration-300"
                                >
                                    Mesa de Regalos
                                </a>
                            </nav>
                        </div>
                    </div>

                    {/* Divisor */}
                    <div className="h-px bg-gradient-to-r from-transparent via-sage-green/20 to-transparent mb-8"></div>

                    {/* Sección inferior */}
                    <div className="flex flex-col md:flex-row items-center justify-around gap-6">
                        {/* Nombres de los novios */}
                        <div className="text-center md:text-left">
                            <p className="font-script text-2xl md:text-3xl text-sage-green/90 mb-1">
                                Francisco & Veaney
                            </p>
                            <p className="text-xs text-white/50 tracking-widest uppercase">
                                01 de Mayo, 2027
                            </p>
                        </div>

                        {/* Copyright */}
                        <div className="text-center">
                            <p className="text-xs text-white/40 font-light">
                                © 2027 Boda de Francisco y Veaney<br />
                                <span className="text-white/30">Hecho con amor</span>
                            </p>
                        </div>

                        
                    </div>
                </div>
            </div>
        </footer>
    );
}
