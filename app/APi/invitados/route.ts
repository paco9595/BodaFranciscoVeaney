import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
    const { data, error } = await supabase.from("wedding_guests").select("id, full_name, partner_name, passes, confirmed");
    if (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
    return Response.json(data);
}