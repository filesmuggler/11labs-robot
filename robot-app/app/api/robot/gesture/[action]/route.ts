import { NextResponse } from 'next/server';

export async function POST(
    request: Request,
    { params }: { params: Promise<{ action: string }> }
) {
    const { action } = await params;
    const fastapiUrl = process.env.FASTAPI_URL || 'http://localhost:8000';

    // Validate action
    const validActions = ['yes', 'no'];
    if (!validActions.includes(action)) {
        return NextResponse.json({ error: 'Invalid gesture action' }, { status: 400 });
    }

    try {
        const response = await fetch(`${fastapiUrl}/gesture/${action}`, {
            method: 'POST',
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: `Failed to trigger gesture ${action}` },
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
