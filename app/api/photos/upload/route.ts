import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

const MAX_FILES = 10

export async function POST(req: Request) {
    try {
        const { paths, uploadedBy } = await req.json()

        if (!paths || !Array.isArray(paths)) {
            return NextResponse.json(
                { error: "Invalid paths" },
                { status: 400 }
            )
        }

        if (paths.length > MAX_FILES) {
            return NextResponse.json(
                { error: `Max ${MAX_FILES} files allowed` },
                { status: 400 }
            )
        }

        // Validación básica de seguridad:
        for (const path of paths) {
            if (!path.startsWith("galeria_boda/")) {
                return NextResponse.json(
                    { error: "Invalid file path" },
                    { status: 400 }
                )
            }
        }

        const records = paths.map((path: string) => ({
            storage_path: path,
            uploaded_by: uploadedBy || null
        }))

        const { error } = await supabase
            .from("wedding_photos")
            .insert(records)

        if (error) {
            console.log(error)
            return NextResponse.json(
                { error: "Database insert failed" },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        )
    }
}