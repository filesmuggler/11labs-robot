import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ action: string }> }
) {
    const { action } = await params;
    const fastapiUrl = process.env.FASTAPI_URL || 'http://localhost:8000';

    // Validate action
    const validActions = ['on', 'off', 'blink'];
    if (!validActions.includes(action)) {
        return NextResponse.json({ error: 'Invalid LED action' }, { status: 400 });
    }

    try {
        const response = await fetch(`${fastapiUrl}/led/${action}`, {
            method: 'POST',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to trigger LED ${action}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
