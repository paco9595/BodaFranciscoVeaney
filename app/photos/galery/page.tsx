import { supabase } from "@/lib/supabase";
import GaleryClient from "./GaleryClient";

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
                <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-12 text-center tracking-tight">
                    Galería de Recuerdos
                </h1>

                <GaleryClient photos={formattedPhotos} />
            </div>
        </main>
    )
}