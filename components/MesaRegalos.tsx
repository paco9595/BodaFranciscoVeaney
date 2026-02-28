export default function MesaRegalos() {
    return (
        <section className="relative z-20 bg-background-light px-4 pb-24" id="mesa-regalos">
            <div className="text-center pb-12">
                <h1
                    className="serif-text text-5xl md:text-6xl font-normal leading-tight pb-6 italic">
                    Mesa de Regalos</h1>
                <div className="w-24 h-px bg-primary/40 mx-auto mb-8"></div>
                <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl mx-auto px-4">
                    Tenerlos con nosotros en este día tan especial es el mejor regalo. Si aun así desean obsequiarnos algo
                    más, hemos preparado una pequeña lista de sugerencias.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                {/* Liverpool Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <h3 className="font-serif text-3xl mb-3 text-stone-800 tracking-wide">Liverpool</h3>
                    <p className="text-stone-500 font-light mb-8 text-sm uppercase tracking-widest">
                        Evento: 12345678
                    </p>
                    <a
                        href="https://mesaderegalos.liverpool.com.mx/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2 border border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300 rounded-full text-sm uppercase tracking-widest"
                    >
                        Ver Mesa de Regalos
                    </a>
                </div>

                {/* Amazon Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-10 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                    <h3 className="font-serif text-3xl mb-3 text-stone-800 tracking-wide">Amazon</h3>
                    <p className="text-stone-500 font-light mb-8 text-sm uppercase tracking-widest">
                        Nuestra lista en línea
                    </p>
                    <a
                        href="https://www.amazon.com.mx/wedding/home"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-2 border border-sage-green text-sage-green hover:bg-sage-green hover:text-white transition-all duration-300 rounded-full text-sm uppercase tracking-widest"
                    >
                        Ver Lista de Regalos
                    </a>
                </div>
            </div>
        </section>
    );
}
