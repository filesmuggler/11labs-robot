import { NextResponse } from 'next/server';

export async function GET() {
    const agentId = process.env.NEXT_PUBLIC_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!agentId || !apiKey) {
        return NextResponse.json(
            { error: 'Missing environment variables' },
            { status: 500 }
        );
    }

    try {
        const response = await fetch(
            `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
            {
                headers: {
                    'xi-api-key': apiKey,
                },
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error("ElevenLabs API Error:", errorText);
            return NextResponse.json(
                { error: 'Failed to get signed URL' },
                { status: 500 }
            );
        }

        const data = await response.json();
        return NextResponse.json({ signedUrl: data.signed_url });
    } catch (error) {
        console.error("Signed URL logic error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
