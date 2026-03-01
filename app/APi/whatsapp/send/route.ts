export default async function POST(req: Request) {
    const { to, message } = await req.json();
    const response = await fetch('https://graph.facebook.com/v19.0/1726332424271488/messages', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: {
                body: message,
            },
        }),
    });
    return response;
}