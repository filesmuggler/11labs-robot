import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const mode = searchParams.get('mode') || 'guess';

    const apiKey = process.env.ELEVENLABS_API_KEY;

    // Select agent ID based on mode
    let agentId: string | undefined;
    if (mode === 'talk') {
        agentId = process.env.NEXT_PUBLIC_AGENT_ID_TALK;
    } else {
        agentId = process.env.NEXT_PUBLIC_AGENT_ID_GUESS;
    }

    if (!agentId || !apiKey) {
        return NextResponse.json(
            { error: `Missing environment variables for mode: ${mode}` },
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
        return NextResponse.json({ signedUrl: data.signed_url, mode });
    } catch (error) {
        console.error("Signed URL logic error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
