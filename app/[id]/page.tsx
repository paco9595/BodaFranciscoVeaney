import SaveTheDate from "@/components/SaveTheDate";
import Galeria from "@/components/Galeria";
import Ubicacion from "@/components/Ubicacion";
import MesaRegalos from "@/components/MesaRegalos";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface PageProps {
    params: Promise<{
        id: string;
        name: string;
        partner_name: string;
        passes: number;
        confirmed: boolean;
    }>;
}

export async function generateStaticParams() {
    const { data, error } = await supabase.from("wedding_guests").select("id, full_name, partner_name, passes, confirmed");

    if (error || !data) {
        return [];
    }

    return data.map((invitado: any) => ({
        id: invitado.id,
        name: invitado.full_name,
        partner_name: invitado.partner_name,
        passes: invitado.passes,
        confirmed: invitado.confirmed,
    }));
}

export default async function InvitationPage({ params }: PageProps) {
    const { id } = await params;

    if (!id) {
        notFound();
    }

    // Buscamos los datos detallados de este invitado en específico
    const { data: invitado, error } = await supabase
        .from("wedding_guests")
        .select("id, full_name, partner_name, passes, confirmed")
        .eq("id", id)
        .single();

    if (error || !invitado) {
        notFound();
    }

    console.log("Datos del invitado:", invitado);

    return (
        <div>
            <SaveTheDate />
            <Galeria />
            <Ubicacion />
            <MesaRegalos />
        </div>
    );
}