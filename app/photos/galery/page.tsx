import { supabase } from "@/lib/supabase";
import GaleryClient from "./GaleryClient";
import Link from "next/link";

export const revalidate = 0; // Para que no cachee las imágenes antiguas y siempre vea las nuevas

export default async function GaleryPage() {
    const { data: photos, error } = await supabase
        .from("wedding_photos")
        .select("*")
        .order("created_at", { ascending: false })
        .range(0, 19);
    console.log(photos)
    if (error) {
        return <div className="p-8 text-center text-red-500">Error al cargar la galería.</div>;
    }

    const formattedPhotos = (photos || []).map((photo: any) => {
        const rawPath = photo.storage_path.replace('galeria_boda/', '');
        const imageUrl = supabase.storage.from("galeria_boda").getPublicUrl(rawPath).data.publicUrl;

        return {
            id: photo.id,
            imageUrl: imageUrl,
            uploaded_by: photo.uploaded_by || 'Anónimo'
        };
    });

    return (
        <main className="min-h-screen py-24 px-4 bg-linear-to-br from-[#faf9f6] to-[#f4eee6]">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-8 text-center tracking-tight">
                    Galería de Recuerdos
                </h1>

                <div className="flex justify-center mb-12">
                    <Link
                        href="/photos"
                        className="inline-flex items-center text-sm px-6 py-2.5 bg-white/50 backdrop-blur-sm border border-[#b59e7a]/30 text-[#b59e7a] hover:bg-[#b59e7a] hover:text-white rounded-full transition-all duration-300 shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Subir nuevas fotos
                    </Link>
                </div>

                <GaleryClient photos={formattedPhotos} />
            </div>
        </main>
    )
}