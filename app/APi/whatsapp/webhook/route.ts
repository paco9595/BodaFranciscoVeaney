const verifyToken = process.env.VERIFY_TOKEN;

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get('hub.mode');
    const challenge = searchParams.get('hub.challenge');
    const token = searchParams.get('hub.verify_token');

    if (mode === 'subscribe' && token === verifyToken) {
        console.log('WEBHOOK VERIFIED');
        return new Response(challenge, { status: 200 });
    } else {
        console.log('WEBHOOK VERIFICATION FAILED');
        return new Response('Forbidden', { status: 403 });
    }
}

export async function POST(req: Request) {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    return new Response(JSON.stringify({ message: "Webhook recibido" }), { status: 200 });
}