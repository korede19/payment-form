import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    const googleResponse = await fetch(process.env.GOOGLE_APPS_SCRIPT_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await googleResponse.json();

    if (!googleResponse.ok) {
      throw new Error(result.error || 'Failed to save form');
    }

    return NextResponse.json({
      success: true,
      message: 'Form successfully saved to Google Sheets',
      googleResult: result,
    });
  } catch (error: any) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
