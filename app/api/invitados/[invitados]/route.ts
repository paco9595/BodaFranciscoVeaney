import { supabase } from "@/lib/supabase";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ invitados: string }> }
) {
    const { invitados } = await params;

    if (!invitados) {
        return Response.json({ error: "ID de invitado requerido" }, { status: 400 });
    }

    try {
        const { data, error } = await supabase
            .from("wedding_guests")
            .select("id, full_name, partner_name, passes, confirmed")
            .eq("id", invitados)
            .single();

        if (error || !data) {
            return Response.json({ error: "Invitado no encontrado" }, { status: 404 });
        }

        return Response.json(data);
    } catch (err) {
        console.error("Error fetching guest:", err);
        return Response.json({ error: "Error al obtener los datos" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ invitados: string }> }
) {
    const { invitados } = await params;

    if (!invitados) {
        return Response.json({ error: "ID de invitado requerido" }, { status: 400 });
    }

    try {
        const body = await request.json();
        const { confirmed } = body;

        if (typeof confirmed !== "boolean") {
            return Response.json(
                { error: "Campo 'confirmed' debe ser booleano" },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from("wedding_guests")
            .update({ confirmed })
            .eq("id", invitados)
            .select("id, full_name, partner_name, passes, confirmed")
            .single();

        if (error || !data) {
            return Response.json(
                { error: "Error al actualizar confirmación" },
                { status: 500 }
            );
        }

        return Response.json(data);
    } catch (err) {
        console.error("Error updating confirmation:", err);
        return Response.json({ error: "Error al procesar la solicitud" }, { status: 500 });
    }
}