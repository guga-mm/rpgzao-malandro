export default async function SmashOrPass({ params }: { params: Promise<{ modo: string }> }) {
    const { modo } = await params;
    
    return <div>Modo: {modo}</div>
}