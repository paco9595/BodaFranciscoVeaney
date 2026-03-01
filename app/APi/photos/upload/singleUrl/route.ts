import { supabase } from "@/lib/supabase"
import { randomUUID } from "crypto"
import { NextResponse } from "next/server"

const MAX_FILES = 10
const MAX_FILE_SIZE = 15 * 1024 * 1024
const ALLOWED_TYPES = [
    "image/jpeg",
    "image/png",
    "image/heic",
    "image/heif",
    "image/webp"
]

export async function POST(req: Request) {
    try {
        const { files, uploaderName } = await req.json()

        if (!files || !Array.isArray(files)) {
            return NextResponse.json(
                { error: "Invalid request" },
                { status: 400 }
            )
        }

        if (files.length > MAX_FILES) {
            return NextResponse.json(
                { error: `Max ${MAX_FILES} files allowed` },
                { status: 400 }
            )
        }

        const uploadUrls = []

        for (const file of files) {
            if (!ALLOWED_TYPES.includes(file.type)) {
                return NextResponse.json(
                    { error: "Invalid file type" },
                    { status: 400 }
                )
            }

            if (file.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: "File size exceeds the maximum limit of 15MB" },
                    { status: 400 }
                )
            }

            const extension = file.type.split("/")[1]

            const rawUploaderName = uploaderName || "Anonimo";
            const safeName = rawUploaderName.trim().replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);

            const fileName = `${safeName}-${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID()}.${extension}`
            const path = `${fileName}`

            const { data, error } = await supabase
                .storage
                .from("galeria_boda")
                .createSignedUploadUrl(path)

            if (error) {
                console.error("Error generating upload URL:", error);
                return NextResponse.json(
                    { error: "Failed generating upload URL" },
                    { status: 500 }
                )
            }

            uploadUrls.push({
                path,
                signedUrl: data.signedUrl
            })
        }

        return NextResponse.json({ uploadUrls })

    } catch (err) {
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        )
    }
}