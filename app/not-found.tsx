import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 px-4 text-center font-sans">
            <div className="mb-8">
                <h2 className="text-8xl font-serif text-stone-300 tracking-tighter">404</h2>
            </div>
            <h3 className="text-3xl font-serif text-stone-800 mb-4">Página no encontrada</h3>
            <p className="text-stone-500 mb-10 max-w-md text-lg leading-relaxed">
                Lo sentimos, no pudimos encontrar la invitación que estás buscando. Es posible que el enlace sea incorrecto o que la página ya no exista.
            </p>
            <Link
                href="/"
                className="px-8 py-3 bg-stone-800 text-stone-50 rounded-full font-medium tracking-wide hover:bg-stone-900 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
            >
                Volver al inicio
            </Link>
        </div>
    )
}
