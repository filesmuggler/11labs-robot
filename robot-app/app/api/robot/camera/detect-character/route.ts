import { NextResponse } from 'next/server';

export async function POST() {
    const fastapiUrl = process.env.FASTAPI_URL || 'http://localhost:8000';

    try {
        const response = await fetch(`${fastapiUrl}/camera/detect-character`, {
            method: 'POST',
        });

        if (!response.ok) {
            const error = await response.text();
            return NextResponse.json({ error }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Robot API error:', error);
        return NextResponse.json({ error: 'Failed to connect to robot' }, { status: 503 });
    }
}

