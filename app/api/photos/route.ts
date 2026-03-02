import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, error } = await supabase
        .from("wedding_photos")
        .select("*")
        .order("created_at", { ascending: false })
        .range(offset, offset + limit - 1);

    if (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Error al obtener las fotos" },
            { status: 500 }
        )
    }

    const formattedPhotos = (data || []).map((photo: any) => {
        const rawPath = photo.storage_path.replace('galeria_boda/', '');
        const imageUrl = supabase.storage.from("galeria_boda").getPublicUrl(rawPath).data.publicUrl;

        return {
            id: photo.id,
            imageUrl: imageUrl,
            uploaded_by: photo.uploaded_by || 'Anónimo'
        };
    });

    return NextResponse.json({ photos: formattedPhotos });
}