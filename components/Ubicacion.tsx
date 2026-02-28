export default function Ubicacion() {
    return (
        <section className="bg-background-light  px-4 py-24 scroll-mt-12" id="ubicacion">
            <div className="text-center mb-16">
                <h1 className="font-display text-4xl md:text-5xl mb-4 tracking-wide ">Nuestra Boda</h1>
                <div className="golden-divider"></div>
                <p className="font-sans font-light uppercase tracking-[0.2em] text-sm text-slate-500 dark:text-slate-400">
                    Celebra con nosotros este día tan especial
                </p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col items-center">
                    <div className="w-full aspect-4/5 overflow-hidden rounded-t-full mb-8 shadow-sm">
                        <img alt="Fachada de la Iglesia para la ceremonia" className="w-full h-full object-cover bw-photo"
                            src="/assets/images/iglesia.jpg" />
                    </div>
                    <div className="text-center space-y-4 px-4">
                        <h2 className="font-display text-2xl italic mb-2">Ceremonia Religiosa</h2>
                        <div className="space-y-1">
                            <p className="font-sans font-medium text-lg">La Parroquia de Nuestra Señora del Carmen</p>
                            <p className="font-sans font-light text-slate-500 dark:text-slate-400">17:00 Horas</p>
                        </div>
                        <div className="py-4">
                            <p className="text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                                Manuel José Othón 410, Centro Historico,<br /> 78000 San Luis Potosí, S.L.P.
                            </p>
                        </div>
                        <a className="inline-flex items-center px-6 py-2 border border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300 rounded-full text-sm uppercase tracking-widest"
                            href="https://maps.app.goo.gl/ktEMf3FN7iaGJjjk9" target="_blank" rel="noreferrer">
                            <span className="material-icons-outlined text-sm mr-2">Lugar</span>
                            Ver en Google Maps
                        </a>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="w-full aspect-4/5 overflow-hidden rounded-t-full mb-8 shadow-sm">
                        <img alt="Jardín de la recepción" className="w-full h-full object-cover bw-photo"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1vvtrHKr2JpN4TXZA5-SjqBQ_c8x_7eZVB89f7fQPWn_diJgB32DGD2EnP_pZ0UIdEIaabWpwBiFMCEEA3fmUV7mHNnBGJDgnpAVbsgPZhrQT23zPX6TYq9OyDfAavbSagMf3bo-VhGDfpz9kdlI8LymL9PZCcE_nLcaWaBstES-UpqfkfcJzSASafZXOMV2XIcLwKoCvhE_6emwWlxyvVeekiR9igKddUZwggTFMYTq7a_dc_Lt7TgvH8nxPP9JX_q5OL2ukeu4C" />
                    </div>
                    <div className="text-center space-y-4 px-4">
                        <h2 className="font-display text-2xl italic mb-2">Recepción</h2>
                        <div className="space-y-1">
                            <p className="font-sans font-medium text-lg">Quinta de los Olivos</p>
                            <p className="font-sans font-light text-slate-500 dark:text-slate-400">19:30 Horas</p>
                        </div>
                        <div className="py-4">
                            <p className="text-sm font-light text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs mx-auto">
                                Carr. Nacional Km 245, El Barro.<br />
                                Monterrey, Nuevo León.
                            </p>
                        </div>
                        <a className="inline-flex items-center px-6 py-2 border border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300 rounded-full text-sm uppercase tracking-widest"
                            href="https://maps.google.com" target="_blank" rel="noreferrer">
                            <span className="material-icons-outlined text-sm mr-2">place</span>
                            Ver en Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
