export async function GET() {
    const response = await fetch("https://api.example.com/invitados");
    const data = await response.json();
    return Response.json(data);
}